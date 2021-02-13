<template>
    <modal :show="show" @close="$emit('close')">
        <div class="h2" style="padding-bottom: 10px;">
            {{ value.title }} <span style="opacity: .3">#{{ id }}</span>
        </div>
        <div>
            <div class="h3">
                Файлы домашней работы
            </div>
            <div v-if="model.files.length === 0">
                Не загружено ни одного файла
            </div>
            <div class="certificate-homework__files">
                <div class="certificate-homework__file"
                     v-for="file in model.files.value" :key="file.id" >
                    <img :src="file.link" />
                </div>
            </div>
        </div>
        <input_box v-bind="model.curator_comment" v-model="model.curator_comment.value" />
        <radio_box :rows="model.status.rows" v-model="model.status.value" />
        <button_box title="Сохранить" :performing="isPerforming" @click="saveData" />
    </modal>
</template>

<script>
    import modal from "@/components/popup/modal";
    import entity from "@/plugins/mixins/entity";
    import modal_base_vars from "@/plugins/mixins/modal_base_vars";
    import validate from "@/plugins/mixins/validate";
    import homeworks_curator from "@/middleware/v2/api/homeworks/homeworks_curator";
    import radio_box from "@/components/form/radio_box";

    export default {
        name: "homework",
        props: {
            value: {
                type: Object,
            },
            show: {
                type: Boolean,
                default: false
            },
        },
        components: {modal, radio_box},
        mixins: [entity, modal_base_vars, validate],
        data() {
            return {
                isPerforming: false,
                model: {
                    curator_comment: {
                        value: '',
                        label: 'Ваш комментарий'
                    },
                    status: {
                        value: '',
                        label: '',
                        rows: [
                            {
                                title: 'На проверке',
                                value: 'checking'
                            },
                            {
                                title: 'Сдано',
                                value: 'passed'
                            },
                            {
                                title: 'Отклонено',
                                value: 'rejected'
                            }
                        ]
                    },
                    title: {
                        value: '',
                        ignore: true,
                    },
                    files: {
                        value: [],
                        ignore: true
                    }
                }
            }
        },
        methods: {
            saveData: async function () {
                if (this.validate()) {
                    this.isPerforming = true
                    console.log(this.id)
                    console.log(this.entity)
                    await homeworks_curator.updateHomework(this.id, this.entity)
                        .then(res => {
                            console.log(res)
                            this.entity = {
                                ...res.data,
                                files: this.model.files.value
                            }
                            this.$emit('update')
                        })
                        .catch(err => {
                            alert(`Произошла ошибка. Код: ${ err.code }`)
                        })

                    this.isPerforming = false
                }
            }
        }
    }
</script>

<style lang="scss">
.certificate-homework {
    display: flex;
    flex-direction: column;
    margin: 10px 0;

    .h2 {
        margin-bottom: 5px;
    }

    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__files {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    &__file {
        width: 90px;
        height: 90px;
        margin-right: 10px;
        margin-bottom: 10px;
        position: relative;

        &:hover {
            & > .certificate-homework__file-close {
                opacity: 1;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        &-close {
            position: absolute;
            top: -12px;
            right: -12px;
            border: 1px solid;
            height: 24px;
            width: 24px;
            cursor: pointer;
            display: flex;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity .2s;
            background-color: white;
        }
    }
}
</style>

