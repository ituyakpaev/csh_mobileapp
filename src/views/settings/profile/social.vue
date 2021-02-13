<template>
    <panel_box title="Объединение аккаунтов">
        <notification :notification="notification" />
        <div class="profile-socials">
            <div class="profile-social-item" v-for="(data, social) in socials" :key="social">
                <div class="profile-social__icon"
                     :style="{ backgroundImage: `url(${ basePath }svg/${data.image})` }" :class="social"
                     @click="user[social].auth ? unconnectSocial(social) : connectSocial(social)" />
                <input_box :value="user[social].auth ? `${ user[social].name } ${ user[social].last_name }` : 'Не подключен'" :disabled="true" :label="data.label"
                           :icon="user[social].auth ? 'close' : 'arrow-right'"
                           @click="user[social].auth ? unconnectSocial(social) : connectSocial(social)" />
                <div class="profile-social__btn"
                     @click="user[social].auth ? unconnectSocial(social) : connectSocial(social)"
                     v-text="user[social].auth ? 'Отключить' : 'Подключить'" />
            </div>
        </div>
    </panel_box>
</template>

<script>
import panel_box from "@/components/regular/panel_box";
import user from "@/middleware/v2/api/user";
import {mapState} from 'vuex'
import notification from "@/components/notification";

export default {
    name: "social",
    components: { panel_box, notification},
    data() {
        return {
            modal: {
                show: false,
                html: '',

            },
            notification: {
                status: false,
                message: null
            },
            socials: {
                vk: {
                    app_id: 7716381,
                    label: 'vk.com',
                    title: 'Вконтакте',
                    performing: false,
                    connect: this.connectVK,
                    unconnect: this.unconnectVK,
                    image: 'vk-white.svg',
                    icon: 'arrow-right',
                    api: {
                        auth: () => new Promise((resolve, reject) => {
                            this.notification.message = null

                            VK.Auth.login(async response => {
                                if (response.status === 'connected') {
                                    let data = {
                                        name: response.session.user.first_name,
                                        last_name: response.session.user.last_name,
                                        //email: null,
                                        social_type: 'VKontakte',
                                        user_id: this.user.id,
                                        social_id: response.session.user.id
                                    }
                                    resolve(data)
                                } else {
                                    reject(response)
                                }
                            }, 4194304)
                        }),
                        check: id => new Promise((resolve, reject) => {
                            user.checkVK(id)
                                .then(res => {
                                    console.log(res)
                                    if (res.data.state) {
                                        reject(res.data)
                                    } else {
                                        resolve(res.data)
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                    reject(err)
                                })
                        }),
                        link: data => user.linkVK(data),
                        unlink: () => user.unlinkVK()
                    }
                },
                fb: {
                    app_id: 398206061505133,
                    label: 'facebook.com',
                    title: 'Facebook',
                    performing: false,
                    connect: this.connectFB,
                    unconnect: this.unconnectFB,
                    image: 'fb-white.svg',
                    api: {
                        auth: () => new Promise((resolve,reject) => {
                            FB.login(res => {
                                if (res.authResponse) {
                                    FB.api('/me?fields=email,first_name,last_name', user => {
                                        let data = {
                                            name: user.first_name || '',
                                            last_name: user.last_name || '',
                                            user_id: this.user.id,
                                            social_id: user.id,
                                            email: user.email,
                                            social_type: 'Facebook',
                                        }
                                        resolve(data)
                                    });
                                } else {
                                    reject(res)
                                }
                            }, {scope: 'email'})
                        }),
                        check: id => new Promise((resolve, reject) => {
                            user.checkFB(id)
                                .then(res => {
                                    if (res.data.state) {
                                        reject(res.data)
                                    } else {
                                        resolve(res.data)
                                    }
                                })
                                .catch(err => {
                                    reject(err)
                                })
                        }),
                        link: data => user.linkFB(data),
                        unlink: () => user.unlinkVK()
                    }
                },
            },
        }
    },
    computed: {
        ...mapState({
            user: state => state.base.user
        })
    },
    methods: {
        connectSocial: async function(social) {
            if (Object.keys(this.socials).indexOf(social) < 0) return

            this.notification.message = null
            this.notification.status = 0

            let code = social
            social = this.socials[social]

            let data = await social.api.auth()
                .catch(err => {
                    this.notification.message = `Вы не прошли авторизацию ${ social.title }`
                    throw(err)
                })

            await social.api.check(data.social_id)
                .catch(err => {
                    if (err.email) {
                        this.notification.message = `Учетная запись ${ social.title } занята аккаунтом ${ err.email }`
                    } else {
                        this.notification.message = `Произошла ошибка при проверке. Код ошибки ${ err.status }`
                    }
                    throw(err)
                })

            await social.api.link(data)
                .catch(err => {
                    if (err.status === 409) {
                        this.notification.message = `Произошел конфликт при привязке.`
                    } else {
                        this.notification.message = `Произошла ошибка при привязке. Код ошибки ${ err.status }`
                    }
                    throw(err)
                })

            this.$store.commit('base/SET_USER', {
                [code]: {
                    auth: true,
                    ...data
                }
            })

            this.notification.status = true
            this.notification.message = `Аккаунт ${ social.title } успешно привязан`
        },

        unconnectSocial(social) {
            if (Object.keys(this.socials).indexOf(social) < 0) return

            let code = social
            social = this.socials[code]

            this.notification.message = null

            social.api.unlink()
                .then(() => {
                    this.notification.status = true
                    this.notification.message = `Аккаунт ${ social.title } успешно отвязан`

                    this.$store.commit('base/SET_USER', {
                        [code]: {
                            auth: false
                        }
                    })
                })
                .catch(err => {
                    this.notification.status = false
                    this.notification.message = `Произошла ошибка при отвязке. Код ошибки ${ err.status }`
                })
        },
    },
}
</script>

<style lang="scss">
.profile-social {

    &__icon {
        width: 63px;
        height: 44px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        margin-right: 50px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center center;
        @include media(xs) {
            width: 58px;
            height: 44px;
            border-radius: 22px;
        }


        &.vk {
            background-color: #4a76a8;
            background-size: 28px 15px;
        }

        &.fb {
            background-color: #3b5998;
            background-size: 14px 25px;
        }

        @include media(xs) {
            margin-right: 20px;
        }
    }

    &-item {
        display: flex;
        align-items: center;
        @include media(sm) {
            flex-wrap: wrap;
        }
    }

    &__btn {
        color: #44525f;
        font-size: 16px;
        font-weight: 400;
        line-height: 21px;
        cursor: pointer;

        @include media(xs) {
            display: none;
        }
    }
}
</style>
