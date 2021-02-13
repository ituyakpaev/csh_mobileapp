<template>
    <panel_box :title="title" :subtitle="subtitle">
        <div>
            <notification :notification="notification" />
            <input_box v-for="(field, key) in model" :key="key"
                       v-bind="field" v-model="field.value" />
            <button_box :performing="isPerforming" title="Сохранить" @click="saveData"/>
        </div>
    </panel_box>
</template>

<script>
import user from "@/middleware/v2/api/user";
import panel_box from "@/components/regular/panel_box";
import entity from "@/plugins/mixins/entity";
import validate from "@/plugins/mixins/validate";
import notification from "@/components/notification";

export default {
    name: "email",
    components: {notification, panel_box},
    mixins: [entity,validate],
    data() {
        return {
            isPerforming: false,
            notification: {
                message: '',
                status: true
            },
            title: 'Электронная почта',
            subtitle: 'Будет использоваться для входа в личный кабинет',
            model: {
                email: {
                    value: '',
                    label: 'Новая эл. почта',
                    required: true,
                    empty_error: 'Введите эл. почту',
                    error: ''
                },
                password: {
                    value: '',
                    label: 'Ваш пароль',
                    type: 'password',
                    required: true,
                    empty_error: 'Введите пароль',
                    error: ''
                }
            }
        }
    },
    methods: {
        saveData: async function () {
            if (this.validate() && this.customValidate()) {
                this.isPerforming = true
                this.notification.message = ''

                await user.updateEmail(this.entity)
                    .then(() => {
                        this.notification.status = true
                        this.notification.message = 'Эл. почта успешно изменена'
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.status === 400) {
                            let code = err.error_code
                            if (code === 40002) {
                                this.model.email.error = 'Эл. почта занята другим аккаунтом'
                            } else if (code === 40001) {
                                this.model.password.error = 'Неправильный пароль'
                            } else {
                                this.model.email.error = 'Произошла неопознанная ошибка'
                            }
                        } else {
                            this.notification.message = false
                            this.notification.title = `Произошла ошибка. Код: ${ err.status }`
                        }
                    })

                this.isPerforming = false
            }
        },
        customValidate() {
            let err = false

            if (this.$store.state.base.user.email === this.entity.email) {
                this.entity.email.value = 'Это ваша текущая почта'
                err = true
            }

            return !err
        }
    },
}
</script>
