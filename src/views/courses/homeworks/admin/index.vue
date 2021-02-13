<template>
    <div class="inner" style="padding: 25px 0;">
        <panel_box title="Домашние работы">
            <table_box v-bind="table" @add="open(false)" @open="open($event)" />
            <item :show="value.show" :value="value.data"
                  @close="value.show = false" @update="getData" />
        </panel_box>
    </div>
</template>

<script>
    import table_box from '../../../../components/table'
    import item from "@/views/courses/homeworks/admin/item";
    import panel_box from "@/components/regular/panel_box";
    import homeworks_admin from "@/middleware/v2/api/homeworks/homeworks_admin";

    export default {
        name: "index.vue",
        components: {panel_box, item, table_box},
        data() {
            return {
                table: {
                    isLoading: true,
                    errorLog: [],
                    data: [],
                    meta: {},
                    headers: {
                        title: {
                            title: 'Название'
                        },
                        course_id: {
                            title: 'Ид-курса'
                        },
                        max_files: {
                            title: 'Макс. файлов'
                        },
                        id: {
                            value: null,
                            ignore: true
                        }
                    }
                },
                value: {
                    data: {},
                    show: false
                }
            }
        },
        methods: {
            getData: async function () {
                this.table.isLoading = true

                await homeworks_admin.getHomeworks(this.$route.query)
                    .then(res => {
                        this.table.data = res.data
                        this.table.meta = {
                            limit: res.data.length,
                            count: res.data.length,
                            skip: 0
                        }
                    })
                    .catch(err => {
                        this.table.errorLog.push(err)
                    })

                this.table.isLoading = false
            },
            open(row) {
                if (row) {
                    this.value.data = row
                } else {
                    this.value.data = {
                        id: -1
                    }
                }
                this.value.show = true
            }
        },
        created() {
            this.getData()
        }
    }
</script>
