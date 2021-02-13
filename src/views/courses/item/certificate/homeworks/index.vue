<template>
    <div class="content">
        <panel_box inner-class="certificate-homework__wrapper"
                   v-bind="title_sets.upload" v-if="passed === 'passed'">
            <div class="certificate-homework__wrapper">
                <div v-for="homework in homeworks" :key="homework.id" class="certificate-homework">
                    <div class="certificate-homework__title h2">
                        {{ homework.title }}
                        <span style="opacity: .7" :inner-html.prop="(homework.user.status || 'not_uploaded') | status"/>
                    </div>
                    <div class="certificate-homework__files">
                        <div v-for="(file, index) in homework.user.files" :key="file.id || (file.preview + index)"
                             class="certificate-homework__file">
                            <!-- <div class="certificate-homework__file-close">
                                <icon name='close' />
                            </div>-->
                            <img :src="file.preview || file.link"/>
                        </div>
                    </div>
                    <div>
                        <file title="Выбрать файлы" :multiple="true" color="grey"
                              @upload="uploadFiles($event, homework.id)"
                              v-if="!homework.user.status || homework.user.status !== 'passed'"/>
                        <span v-if="homework.user.status === 'rejected' && homework.user.curator_comment">
                        Комментарий куратора: {{ homework.user.curator_comment }}
                    </span>
                    </div>
                </div>
                <div class="certificate-homework__footer">
                    <button_box title="Отправить домашние работы" :performing="isPerforming" @click="saveData"/>
                    <div v-if="progress.files.loading" class="certificate-homework__loading">
                        Загрузка файлов ... ({{ files_progress }} %)
                    </div>
                    <div v-if="progress.files.error > 0" class="certificate-homework__error">
                        {{ progress.files.error }} из {{ progress.files.need }} не загружены из-за возникшей ошибки
                    </div>
                </div>
            </div>
        </panel_box>
        <download :title="title_sets.passed.title" :subtitle="title_sets.passed.subtitle" :is_mega="true" v-else-if="passed === 'upload'" />
    </div>
</template>

<script>
import panel_box from "@/components/regular/panel_box";
//import download from "@/views/courses/item/certificate/homeworks/download";
import download from '../index'
import homeworks_user from "@/middleware/v2/api/homeworks/homeworks_user";
import file from "@/components/form/file";

export default {
    name: "index",
    components: {
        panel_box,
        file,
        download
    },
    data() {
        return {
            title_sets: {
                upload: {
                    title: 'Загрузите домашние работы',
                    subtitle: `Вам необходимо приготовить и сфотографировать один любой вид трюфелей из урока, конфеты «Птичье молоко», один любой вид зефира из урока, макаронс с любым взбитым ганашом.<br><br>
                    Фотографии десертов загрузить сюда. Нужны общее фото и разрез/разлом (обязательно!). После проверки вам станет доступен сертификат об окончании курса «Десерты к праздникам».`
                },
                passed: {
                    title: 'Поздравляем!',
                    subtitle: `Вы успешно окончили курс, и теперь можете скачать сертификат об окончании обучения!`
                }
            },
            isLoading: true,
            isPerforming: false,
            progress: {
                homeworks: {
                    need: 0,
                    complete: 0
                },
                files: {
                    need: 0,
                    complete: 0,
                    error: 0,
                    loading: false
                }
            },
            errorLog: [],
            homeworks: {}
        }
    },
    filters: {
        status(v) {
            let obj = {
                passed: {
                    text: 'Принято',
                    color: ''
                },
                rejected: {
                    text: 'Отклонено',
                    color: ''
                },
                checking: {
                    text: 'На проверке',
                    color: ''
                },
                new: {
                    text: 'Новая',
                    color: ''
                },
                not_uploaded: {
                    text: 'Не загружена',
                    color: ''
                }
            }
            if (obj[v]) {
                return `<span class="text">${obj[v].text}</span>`
            }
            return ""
        }
    },
    computed: {
        files_progress() {
            if (this.progress.files.need) {
                return ((this.progress.files.complete || 0) / this.progress.files.need) * 100
            } else {
                return null
            }
        },
        passed() {
            if (this.isLoading) {
                return null
            } else if (Object.values(this.homeworks).filter(h => h.user.status !== 'passed').length > 0) {
                return 'passed'
            } else {
                return 'upload'
            }
        }
    },
    methods: {
        getData: async function () {
            this.isLoading = true
            let homeworks = {}

            await homeworks_user.getHomeworks(this.$route.params.case, this.$route.query)
                .then(res => {
                    console.log(res)
                    res.data.map(homework => {
                        homeworks[homework.id] = {
                            ...homework,
                            user: {
                                files: []
                            }
                        }
                    })
                })
                .catch(err => {
                    this.errorLog.push(err)
                })

            await homeworks_user.getMyHomeworks(this.$route.params.case, this.$route.query)
                .then(res => {
                    console.log(res)
                    res.data.map(user_homework => {
                        if (homeworks[user_homework.homework_id]) {
                            homeworks[user_homework.homework_id].user = {
                                files: [],
                                ...user_homework
                            }
                        }
                    })
                })
                .catch(err => {
                    this.errorLog.push(err)
                })

            this.homeworks = homeworks
            this.isLoading = false
        },
        saveData: async function () {
            this.isPerforming = true

            let creation_promises = []

            Object.keys(this.homeworks).map(id => {
                if (!this.homeworks[id].user.id) {
                    creation_promises.push(
                        homeworks_user.createHomework({
                            status: 'checking',
                            homework_id: id
                        })
                            .then(res => {
                                this.homeworks[id].user = {
                                    ...res.data,
                                    files: this.homeworks[id].user.files
                                }
                            })
                    )
                } else if (this.homeworks[id].user.status === 'rejected') {
                    creation_promises.push(
                        homeworks_user.updateHomework(this.homeworks[id].user.id, {
                            status: 'checking',
                            homework_id: id
                        })
                            .then(res => {
                                this.homeworks[id].user = {
                                    ...res.data,
                                    files: this.homeworks[id].user.files
                                }
                            })
                    )
                }
            })

            await Promise.all(creation_promises)

            this.progress.files.need = 0
            this.progress.files.error = 0

            Object.keys(this.homeworks).map(id => {
                if (this.homeworks[id].user.files) {
                    this.progress.files.need += this.homeworks[id].user.files.filter(file => !file.id).length
                }
            })

            let files_promises = []
            this.progress.files.loading = true

            Object.keys(this.homeworks).map(id => {
                this.homeworks[id].user.files.map(file => {
                    if (!file.id) {
                        files_promises.push(
                            homeworks_user.createFile(this.homeworks[id].user.id, file)
                                .then(() => {
                                    this.progress.files.complete += 1
                                })
                                .catch(() => {
                                    this.progress.files.error += 1
                                })
                        )
                    }
                })
            })

            await Promise.all(files_promises)

            this.progress.files.loading = false
            this.isPerforming = false
        },
        deleteFile: async function (value, homework_id) {
        },
        uploadFiles: async function (value, homework_id) {
            console.log(value)
            this.homeworks[homework_id].user.files.push({
                preview: value.preview,
                link: value.value
            })
            return
        }
    },
    created() {
        this.getData()
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

    &__loading {
        animation: blinking 1s infinite;

        @keyframes blinking {
            from {
                opacity: 1;
            }
            50% {
                opacity: .7;
            }
        }
    }

    &__error {
        color: red;
    }
}
</style>
