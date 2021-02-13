<template lang="pug">
    .lk-menu
        .lk-menu__overlay(:class="{'lk-menu__overlay_active' : showMenu}", @click="$store.commit('base/TOGGLE_MENU')")
        .lk-menu__layout(:class="{'lk-menu__layout_active' : showMenu}", v-scrollbar)
            .lk-menu__layout-inner
                .lk-menu__head
                    .lk-menu__inner.lk-menu__head-inner

                        tooltip(
                            interactive,
                            placement="bottom-start",
                            boundary="window",
                            theme="menu",
                            distance="10",
                            animation="fade",
                            trigger="mouseenter",
                            arrow,
                        )
                            template(slot="trigger")
                                .lk-menu__head-backout
                                    icon(name="quit", width="30")
                                    | Выйти из ЛК
                            template
                                a(href="https://alinamakarova.ru").link Вернуться на сайт
                                hr
                                div(@click="$store.dispatch('base/exit')").link Выйти из ЛК
                        //v-ripple,
                        .lk-menu__head-close( @click="$store.commit('base/TOGGLE_MENU')"): icon(name="close", width="30")

                .lk-menu__user
                    .lk-menu__inner
                        .lk-menu__user-photo(v-lazy:background-image="user.picture")
                            .lk-menu__user-photo-edit: icon(name="plus", width="18")
                        .lk-menu__user-name {{ user.name }}
                        .lk-menu__user-email {{ user.email }}
                        .lk-menu__user-edit(@click="goProfile")
                            btn-item Редактировать
                        .lk-menu__user-date На сайте с {{ user.date_register ? user.date_register.split('-').reverse().join('.') : '' }}

                .lk-menu__body
                    .lk-menu__group(v-for="group in $store.getters['base/navigation']")
                        .lk-menu__inner
                            .lk-menu__title {{ group.title }}
                            menu-case(v-for="(item, index) in group.rows", :item="item", :key="index")

                a.lk-menu__footer(href="https://alinamakarova.ru")
                    .lk-menu__inner
                        .lk-menu__footer-inner
                            icon(name="arrow-back", width="30")
                            | Вернуться на сайт


</template>

<script>
    import { mapState, mapGetters } from "vuex";

    import MenuCase from './menu-case'
    import BtnItem from "../btn-item";

    export default {
        components: {
            BtnItem,
            MenuCase
        },

        computed: {
            ...mapState({
                showMenu: state => state.base.showMenu,
                user: state => state.base.user
            }),
        },

        data(){
            return {
                curator_group: {}
            }
        },
        methods: {
            goProfile() {
                this.$router.push('/settings/profile')
            }
        },
        created() {
            this.$router.afterEach((to, from) => {
                if ( to.meta.section !== from.meta.section ){
                    this.$store.commit('base/TOGGLE_MENU', false);
                }
            })
        }
    }
</script>

<style scoped lang="scss">


    .lk-menu{
        position: relative;
        z-index: 999;

        &::v-deep{
            .os-scrollbar{
                display:none!important;
            }
        }

        &__overlay{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            opacity: 0;
            transition: all .5s ease;
            backdrop-filter: blur(6px);

            &_active{
                pointer-events: auto;
                opacity: 1;
            }
        }

        &__layout{
            position: fixed;
            top: 0;
            left: -10px;
            width: 100%;
            max-width: 320px;
            bottom: 0;
            background: #fff;
            transform: translateX(-100%);
            box-shadow: $box-shadow;
            transition: transform .5s cubic-bezier(0.25, 1, 0.25, 1); //cubic-bezier(0.25, 1, 0.5, 1);
            overflow: auto;
            will-change: transform;

            &-inner{
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            &_active{
                transform: translateX(0%);
            }
        }

        &__inner{
            margin: 0 20px;
        }

        &__head{

            &-inner{
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            &-backout{
                display: inline-flex;
                align-items: center;
                cursor: pointer;
                color: $color-grey-light;
                margin-left: -10px;

                &:hover{
                    color: $color-yellow;
                }

                .icon{
                    margin-right: 5px;
                }
            }
            &-close{
                cursor: pointer;
                color: $color-yellow;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-size: 0;
                margin-right: -20px;

                .icon{
                    display: block;
                }
            }
        }

        &__user{
            text-align: center;
            padding-bottom: 24px;

            &-photo{
                margin: 0 auto;
                width: 110px;
                height: 110px;
                border-radius: 50%;
                background-size: cover;
                position: relative;
                background-color: $color-grey;

                &-edit{
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    border: 1px solid #fff;
                    background: $color-yellow;
                    color: #fff;
                    cursor: pointer;
                    position: absolute;
                    right: 6px;
                    bottom: 6px;
                }
            }
            &-name{
                font-size: 16px;
                font-weight: 500;
                margin: 16px 0 10px;
            }
            &-email{
                margin: 10px 0 18px;
                font-weight: 400;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            &-edit{
                margin: 18px 0;
            }
            &-date{
                color: $color-grey;
                font-size: 12px;
            }
        }

        &__body{
            flex: 1 1 auto;
        }

        &__group{
            border-top: 1px solid #ECECEC;
            padding: 15px 0;
        }

        &__title{
            color: $color-grey-light;
            margin-bottom: 6px;
        }

        &__footer{
            background: $color-grey;
            color: #fff;
            cursor: pointer;
            display: block;

            &:hover{
                background: darken($color-grey, 10%);
            }

            &-inner{
                height: 70px;
                display: flex;
                align-items: center;

                .icon{
                    margin-right: 5px;
                }
            }
        }
    }


</style>
