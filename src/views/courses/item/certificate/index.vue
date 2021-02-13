<template>
    <panel_box :style="{ paddingBottom: step.number === 1 ? '100px' : '20px' }"
               :title="title" :subtitle="subtitle"
               style="margin-top: 20px;">
        <div class="certificate">
            <div class="certificate__steps">
                <div class="certificate__steps-step h2">
                    Шаг {{ step.number }} из 2
                </div>
                <div class="certificate__steps-title">
                    {{ step.title[step.number] }}
                </div>
            </div>
            <div class="certificate__action">
                <div class="certificate__action-inner" v-if="step.number === 1">
                    <input_box v-for="(field, key) in model" :key="`certificate_${ key }`"
                        v-model.trim="field.value" v-bind="field" />
                    <button_box title="Сохранить" @click="saveCertificateName" :performing="isPerforming" />
                    <notification class="certificate__notification" title="Важно!"
                                  text="Имя для сертификата можно записать только 1 раз!"/>
                </div>
                <div class="certificate__action-inner" v-if="step.number === 2">
                    <button_box title="Скачать сертификат" @click="downloadCertificate"/>
                </div>
            </div>
        </div>
    </panel_box>
</template>

<script>
    import panel_box from "../../../../components/regular/panel_box";
    import notification from "../../../../components/regular/notification";
    import course from "@/middleware/v1/api/course";
    import entity from "@/plugins/mixins/entity";
    import validate from "@/plugins/mixins/validate";
    import {mapState} from 'vuex'
    import { query } from '@/middleware/v2/helpers'
    import { URL } from '@/middleware/v1/helpers'

    export default {
        name: "index.vue",
        components: {panel_box, notification},
        mixins: [ entity, validate ],
        props: {
            is_mega: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: "Поздравляем!"
            },
            subtitle: {
                type: String,
                default: "Вы успешно завершили курс, и теперь можете скачать сертификат."
            }
        },
        data() {
            return {
                isPerforming: false,
                model: {
                    name: {
                        value: '',
                        error: '',
                        label: 'Ваше имя',
                        required: true,
                        empty_error: 'Введите имя'
                    },
                    last_name: {
                        value: '',
                        error: '',
                        label: 'Ваша фамилия',
                        required: true,
                        empty_error: 'Введите фамилию'
                    }
                },
                step: {
                    number: 1,
                    title: {
                        1: 'Введите свое имя и фамилию для сертификата',
                        2: 'Скачайте сертификат'
                    }
                }
            }
        },
        computed: {
            ...mapState({
                filled_name: state => state.course.certificate.name,
                course_id: state => state.course.course_id
            })
        },
        methods: {
            saveCertificateName: async function () {
                if (this.validate()) {
                    this.isPerforming = true

                    let data = {
                        id: this.$route.params.case,
                        name: `${ this.entity.name } ${ this.entity.last_name }`
                    }

                    console.log(data)
                    await course.saveNameCertificate(data)
                        .then(res => {
                            console.log(res)
                            this.step.number = 2
                        })

                    this.isPerforming = false
                }
            },
            downloadCertificate() {
                let q = {
                    token: localStorage.getItem('session_id')
                }
                if (this.is_mega) {
                    q = {
                        ...q,
                        action: "print_mega_sertificate",
                        course_id: this.course_id,
                    }
                    window.open(`${ URL }api.php${ query(q) }`)
                } else {
                    q = {
                        ...q,
                        action: "get_certificate",
                        id: this.course_id,
                    }
                    window.open(`${ URL }api.php${ query(q) }`)
                }
            }
        },
        created() {
            if (this.filled_name) {
                this.step.number = 2
            }
        }
    }
</script>

<style scoped lang="scss">
    .certificate {
        padding: 15px 0;
        display: flex;
        flex-direction: column;
        align-content: flex-start;

        &__steps, &__action {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }

        &__action-inner {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            margin-top: 10px;
        }

        &__notification {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
        }
    }
</style>
