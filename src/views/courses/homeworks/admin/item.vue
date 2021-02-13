<template>
    <modal :show="show" @close="$emit('close')">
        <input_box v-bind="model.course_id" v-model.number="model.course_id.value" />
        <input_box v-bind="model.title" v-model="model.title.value" />
        <input_box v-bind="model.max_files" v-model.number="model.max_files.value" />
        <div style="display: flex">
            <button_box title="Сохранить" @click="saveData" :performing="isPerforming" />
            <button_box title="Удалить" color="grey" @click="deleteData" />
        </div>
    </modal>
</template>

<script>
    import homeworks_admin from "@/middleware/v2/api/homeworks/homeworks_admin";
    import entity from "@/plugins/mixins/entity";
    import save_modal from "@/plugins/mixins/save_modal";
    import modal_base_vars from "@/plugins/mixins/modal_base_vars";
    import modal from "@/components/popup/modal";

    export default {
        name: "item",
        mixins: [ entity, modal_base_vars, save_modal ],
        components: {modal},
        props: {
            show: {
                type: Boolean,
                default: false
            },
            value: {
                type: Object,
            }
        },
        data() {
            return {
                isLoading: true,
                isPerforming: false,
                errorLog: [],
                model: {
                    course_id: {
                        value:  '',
                        label: 'ID курса',
                        required: true,
                    },
                    title: {
                        value: '',
                        label: 'Название домашней работы',
                        required: true
                    },
                    max_files: {
                        value: 1,
                        label: 'Кол-во файлов для загрузки',
                        required: true
                    }
                },
                api: {
                    update: homeworks_admin.updateHomework,
                    create: homeworks_admin.createHomework
                }
            }
        },
        methods: {
            getData: async function () {
                this.isLoading = true

                if (!this.isNew) {
                    homeworks_admin.getHomework(this.id)
                        .then(res => {
                            this.entity = res
                        })
                        .catch(err => {
                            this.errorLog.push(err)
                        })
                }

                this.isLoading = false
            },
            deleteData: async function () {
                if (confirm('Вы уверены? Все загруженные домашние работы будут удалены.')) {
                    homeworks_admin.deleteHomework(this.id)
                        .then(res => {
                            this.$emit('close')
                            this.$emit('update')
                        })
                        .catch(err => {
                            alert('Произошла ошибка')
                        })
                }
            }
        }
    }
</script>
