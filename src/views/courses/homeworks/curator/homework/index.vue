<template>
    <div class="inner content">
        <panel_box :title="user.name">
            <div>
                Имя ученика: {{ user.name }} <span style="opacity: .3">#{{ user.user_id }}</span><br>
                Почта: {{ user.email }}
            </div>
            <button_box :performing="letter.isPerforming" title="Отправить письмо о сдаче ДЗ" @click="sendLetter()" />
            <notification :notification="letter.notification" />
            <table_box v-bind="table" @open="open($event)" />
            <item :value="item.value" :show="item.show" @close="item.show = false" />
        </panel_box>
    </div>
</template>

<script>
    import panel_box from "@/components/regular/panel_box";
    import homeworks_curator from "@/middleware/v2/api/homeworks/homeworks_curator";
    import course from "@/middleware/v1/api/course";
    import table_box from '@/components/table/index'
    import notification from "@/components/notification";
    import item from './homework'

    export default {
        name: "homework",
        components: {panel_box,table_box,item, notification},
        data() {
            return {
                isLoading: true,
                isPerforming: false,
                errorLog: [],
                user: {},
                letter: {
                    isPerforming: false,
                    notification: {
                        status: true,
                        message: ''
                    }
                },
                table: {
                    manage: [],
                    headers: {
                        title: {
                            title: 'Название',
                        },
                        status: {
                            title: 'Статус'
                        },
                    },
                    meta: {},
                    data: []
                },
                item: {
                    show: false,
                    value: {}
                }
            }
        },
        methods: {
            getData: async function () {
                this.isLoading = true

                await homeworks_curator.getUserHomeworks(this.$route.params.user_id)
                    .then(res => {
                        console.log(res)
                        this.table.data = res.data.homework
                        this.table.meta = {
                            count: res.data.homework.length,
                            limit: res.data.homework.length,
                            skip: 0
                        }
                        this.user = res.data
                    })
                    .catch(err => {
                        this.errorLog.push(err)
                    })

                this.isLoading = false
            },
            open(row) {
                if (row) {
                    console.log(row)
                    this.item.value = row
                } else {
                    this.item.value = {
                        id: -1
                    }
                }
                this.item.show = true
            },
            sendLetter: async function () {
                this.letter.isPerforming = true
                this.letter.notification.message = ""

                await course.sendLetterCertificate(this.user.email)
                    .then(res => {
                        if (!res.data.status) {
                            this.letter.notification.status = false
                            this.letter.notification.message = 'Произошла ошибка'
                        } else {
                            this.letter.notification.status = true
                            this.letter.notification.message = "Письмо отправлено"
                        }
                    })
                    .catch(err => {
                        this.letter.notification.status = false
                        this.letter.notification.message = 'Произошла ошибка'
                        console.log(err)
                    })

                this.letter.isPerforming = false
            }
        },
        created() {
            this.getData()
        }
    }
</script>
