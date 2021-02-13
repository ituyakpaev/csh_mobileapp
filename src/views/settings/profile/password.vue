<template>
    <panel_box title="Пароль">
        <div class="profile-pass">
            <div>
                <input_box v-for="(field,key) in model" :key="key"
                           v-bind="field" v-model="field.value"/>
                <notification :notification="notification"/>
                <button_box @click="saveData" :performing="isPerforming">
                    Обновить пароль
                </button_box>
            </div>
            <div class="form-pass__popup">
                <ul class="profile-pass-valid"
                    :class="{ opened: model.new_password.error && model.new_password.value.length > 0 }">
                    <li class="profile-pass-valid__item">Убедитесь, что не включена кнопка <span>Caps Lock</span></li>
                    <li class="profile-pass-valid__item">Пароль должен быть не менее 6 символов в длину</li>
                    <li class="profile-pass-valid__item">Хороший пароль должен состоять из букв и цифр</li>
                </ul>
            </div>
        </div>
    </panel_box>
</template>

<script>
import panel_box from "@/components/regular/panel_box";
import entity from "@/plugins/mixins/entity";
import validate from "@/plugins/mixins/validate";
import user from "@/middleware/v2/api/user";
import notification from "@/components/notification";

export default {
    name: "password",
    components: {panel_box, notification},
    mixins: [entity, validate],
    data() {
        return {
            isPerforming: false,
            pass_valid_pop: false,
            notification: {
                status: true,
                message: null
            },
            model: {
                old_password: {
                    value: '',
                    type: 'password',
                    error: '',
                    required: true,
                    label: 'Старый пароль'
                },
                new_password: {
                    value: '',
                    error: '',
                    required: true,
                    validate: [
                        {
                            regexp: /^.{6,}$/,
                            title: 'Пароль меньше 6 символов'
                        },
                        {
                            regexp: /[a-zA-Z]+/i,
                            title: 'Должна быть хотя бы 1 буква'
                        },
                        {
                            regexp: /[0-9]+/i,
                            title: 'Должно быть хотя бы 1 число'
                        }
                    ],
                    type: 'password',
                    label: 'Новый пароль'
                },
                repeat_password: {
                    value: '',
                    error: '',
                    ignore: true,
                    required: true,
                    type: 'password',
                    label: 'Повторите пароль'
                }
            }
        }
    },
    methods: {
        saveData: async function () {
            if (this.validate() && this.customValidate()) {
                this.isPerforming = true
                this.notification.message = ''

                user.updatePassword(this.entity)
                    .then(() => {
                        this.notification.status = true
                        this.notification.message = 'Пароль успешно изменен.'
                    })
                    .catch(err => {
                        if (err.status === 400) {
                            console.log(err)
                            let code = err.error_code
                            if (code === 40001) {
                                this.model.old_password.error = 'Неправильный пароль'
                            } else {
                                this.model.old_password.error = 'Произошла неизвестная ошибка'
                            }
                        } else {
                            this.notification.status = false
                            this.notification.message = `Произошла неизвестная ошибка. Код: ${err.status}`
                        }
                    })

                this.isPerforming = false
            }
        },
        customValidate() {
            let error = false

            if (!error && this.model.new_password.value !== this.model.repeat_password.value) {
                error = true
                this.model.repeat_password.error = 'Пароли не совпадают'
            }

            if (this.model.new_password.length < 0) {
                error = true
                this.pass_valid_pop = true
            }

            return !error
        }
    }
}
</script>

<style lang="scss">

.profile-pass {
    display: flex;

    &-valid {
        max-width: 320px;
        background-color: #44525f;
        padding: 20px 20px 20px 25px;
        border-radius: 3px;
        position: relative;

        //for animation
        transform: translateX(-50px);
        transition: all .3s ease-in 0s;
        opacity: 0;
        z-index: -1;

        @include media(xs) {
            display: none;
        }

        &.opened {
            opacity: 1;
            transition: all 0.3s ease-out 0s;
            transform: translateX(0);
            z-index: 1;
        }

        &::before {
            content: '';
            position: absolute;
            border: 7px solid transparent;
            border-right: 7px solid #44525f;
            top: 80px;
            left: -13px;
            margin-top: -3px;

            /*@include media(sm) {
                top: -10px;
                left: 50%;
                margin-top: -3px;
                transform: rotate(90deg);
                margin-left: -7px;
            }*/
        }

        @include media(sm) {
            top: 13px;
            left: -9px;
            z-index: 5;
        }

        &__item {
            color: #ffffff;
            font-family: 'Roboto';
            font-size: 13px;
            font-weight: 300;
            line-height: 22px;
            position: relative;

            span {
                font-weight: 500;
            }

            &::before {
                content: '';
                width: 7px;
                height: 7px;
                background-color: $color-yellow;
                position: absolute;
                border-radius: 50%;
                top: 7px;
                left: -13px;

            }
        }
    }
}
</style>
