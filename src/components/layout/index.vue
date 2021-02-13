<template>
    <div class="lk" v-if="errorLog.length > 0">
        <div class="inner">
            <error :error="errorLog[0]" />
            мавтлмтва
        </div>
    </div>
    <div class="lk" v-else-if="loading">
        <div class="loader"/>
        рш ьтмолатлмтвалотмва
    </div>
    <div class="lk" v-else :class="[{'lk_nav': localNavigation || $route.meta.section === 'baza' }]">
        <gallery :id="`b-gallert-${_uid}`" :images="gallery" :index="imageOpened" @close="imageOpened = null"/>
        <v_header :show-local-nav="localNavigation" />
        <lk-menu  />
        <v_auth class="lk-auth" v-if="!$store.state.base.session.status" />
        <div class="lk-content" v-else >
            <transition mode='out-in' name="content">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
import user from "@/middleware/v2/api/user";
import auth from "@/middleware/v2/api/auth"
import {mapState} from "vuex";
import LkMenu from './menu'
import v_header from './header'
import v_auth from '../../views/auth'
import error from "@/components/error";

export default {
    components: { v_auth, v_header, LkMenu, error },

    data() {
        return {
            loading: true,
            errorLog: []
        }
    },

    computed: {
        ...mapState({
            user: state => state.base.user,
            localNav: state => state.base.localNav,
            gallery: state => state.base.gallery.items
        }),

        imageOpened: {
            get() {
                return this.$store.state.base.gallery.open;
            },
            set(value) {
                this.$store.commit('base/SET_GALLERY_OPEN', value)
            }
        },

        localNavigation() {
            let lv = this.localNav[this.$route.meta.section],
                bp = this.$store.state.base.breakpoint.current
            return lv && lv.rows.length > 0 && (!lv.breakpoints || lv.breakpoints.indexOf(bp) >= 0)
        }
    },

    methods: {
        catchWsMessage(e) {
            let data = {};

            try {
                data = JSON.parse(e);
                console.info(data);
            } catch (err) {
                console.info(err);
                console.info(e);
            }

            this.$eventHub.$emit('ws-onmessage', {
                data,
                user: this.user
            });

            if (data.signals && data.signals.length) {
                data.signals.forEach(item => {
                    switch (item.object) {
                        case 'nav_dialogs':
                            if (this.user.curator && item.data.menu && item.data.menu.length) {
                                item.data.menu.forEach(menu => {
                                    this.$store.commit('base/SET_LOCAL_NAV_COUNT', {
                                        name: 'dialogs',
                                        id: menu.id,
                                        count: menu.count
                                    });
                                })
                            }
                            break;
                        case 'dialog_menu':
                            if (item.data.chat && item.data.chat.id) {

                                if (this.user.curator) {
                                    this.$store.commit('dialogs/SET_MENU_COUNT', {
                                        id: item.data.chat.id,
                                        count: item.data.chat.count,
                                        text: item.data.chat.text,
                                        date: item.data.chat.date,
                                    });
                                } else {
                                    this.$store.commit('base/SET_LOCAL_NAV_COUNT', {
                                        name: 'dialogs',
                                        id: item.data.chat.id,
                                        count: item.data.chat.count
                                    });
                                }

                            }
                            break;
                        case 'message':
                            console.info(item.data);
                            if (item.data.action === 'remove') {
                                this.$store.commit('dialogs/REMOVE_POST', item.data.id);
                            } else if (item.data.action === 'restore') {
                                this.$store.commit('dialogs/RESTORE_POST', item.data.id);
                            }
                            break;
                        default:
                            break;
                    }
                })
            }
        },
        checkAuth: async function () {
            let token = localStorage.getItem('session_id')

            return new Promise((resolve, reject) => {
                if (token) {
                    auth.testToken(token)
                        .then(() => {
                            this.$store.commit('base/SET_AUTHSTATE', true )
                            this.$store.commit('base/SET_SESSION', { token, status: true })
                            this.$store.dispatch('base/getCookies')
                            resolve(true)
                        })
                        .catch(err => {
                            if (err.status === 401) {
                                this.$store.commit('base/SET_SESSION', { status: false })
                            } else {
                                this.errorLog.push(err)
                            }
                            reject(err)
                        })
                } else {
                    this.$store.commit('base/SET_SESSION', { status: false })
                    this.$store.commit('base/SET_AUTHSTATE', false )
                    reject({
                        status: 401
                    })
                }
            })
        },
        getCommonInfo: async function () {
            this.loading = true

            await user.getUser()
                .then(res => {
                    console.log(res)
                    this.$store.commit('base/SET_USER', {
                        ...res.data,
                        curator: res.data.is_curator
                    })
                })
                .catch(err => {
                    this.errorLog.push(err)
                })

            this.loading = false
        },
        getWs: async function () {
            //await this.$store.dispatch('base/getMenu');
            /*await this.$store.dispatch('base/commonInfo').finally(() => {
                this.loading = false;
            });*/
            const websocket = new WebSocket(`wss://alinamakarova.ru:2096/?user=${this.user.id}`);
            websocket.onmessage = (e) => {
                console.info(e);
                this.catchWsMessage(e.data);
            };
            websocket.onopen = () => {
                this.$store.commit('base/SET_WEBSOCKET', websocket);
                console.info("Соединение установлено.");
            };
            websocket.onerror = (error) => {
                console.info("Ошибка ", error);
            };
        }
    },

    created: async function () {
        try {
            await this.checkAuth()

            await this.getCommonInfo()

            this.loading  = false

            this.getWs()
        } catch(err) {
            this.loading = false
        }
    },

    mounted() {
        window.catchWsMessage = this.catchWsMessage;
    },
}
</script>

<style lang="scss">

.lk {
    padding-top: 65px;
    height: 100%;
    box-sizing: border-box;

    &_nav {
        padding-top: 100px;
    }

    &-content {
        height: 100%;
        overflow-x: hidden;
    }

    &-auth {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 10000;
    }
}

.lk-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    box-shadow: $header-shadow;
    z-index: 900;

    &.noshadow {
        box-shadow: none;
    }


    &__top {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 65px;
    }

    &__handler {
        cursor: pointer;
        width: 50px;
        min-width: 50px;
        height: 50px;
        position: relative;
        border-radius: 50%;
        margin: -15px 5px -15px -15px;
        @include media (xs){
            margin-right: 0px;
        }

        &-burger {
            width: 16px;
            height: 2px;
            position: absolute;
            top: 50%;
            left: 50%;
            background: $color-yellow;
            border-radius: 10px;
            transform: translate(-50%, -50%);
            transition: all .3s ease;

            .lk-header__handler_active & {
                width: 2px;
            }

            &:before,
            &:after {
                content: '';
                width: 16px;
                height: 2px;
                position: absolute;
                top: 50%;
                left: 50%;
                background: $color-yellow;
                border-radius: 10px;
                transition: all .3s ease;
                transform: translate(-50%, -50%) rotate(0);
            }

            &:before {
                margin-top: -7px;

                .lk-header__handler_active & {
                    transform: translate(-50%, -50%) rotate(-45deg);
                    margin-top: 0;
                }
            }

            &:after {
                margin-top: 7px;

                .lk-header__handler_active & {
                    transform: translate(-50%, -50%) rotate(-135deg);
                    margin-top: 0;
                }
            }
        }
    }

    &__title {
        font-size: 24px;
        font-family: $font-title;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        align-items: center;
        @include media (xs){
            font-size: 20px;
            margin-left: 0px;
        }
    }
}


</style>
