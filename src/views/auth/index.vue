<template>
    <div class="auth" >
        <input_box v-for="(input, key) in model" :key="key" v-bind="input" v-model="input.value" />
        <button_box title="Гоу" :perfoming="isPerforming" @click="auth" />
    </div>
</template>

<script>
    import auth from "@/middleware/v2/api/auth";
    import entity from "@/plugins/mixins/entity";
    import validate from "@/plugins/mixins/validate";
    export default {
        name: "auth",
        mixins: [entity, validate],
        data() {
            return {
                isPerforming: false,
                model: {
                    login: {
                        value: '',
                        label: 'login',
                        error: '',
                        required: true
                    },
                    password: {
                        value: '',
                        label: 'password',
                        type: 'password',
                        required: true
                    }
                }
            }
        },
        methods: {
            auth: async function () {
                if (this.validate()) {
                    this.isPerforming = true

                    await auth.auth(this.entity.login, this.entity.password)
                        .then(res => {
                            this.$store.commit('base/SET_SESSION', {
                                token: `${ res.data.token_type } ${ res.data.access_token }`,
                                status: true
                            })
                        })
                        .catch(err => {
                            this.model.login.error = 'что то не так'
                        })

                    this.isPerforming = false
                }
            }
        }
    }
</script>

<style lang="scss" >
    .auth {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
