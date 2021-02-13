<template>
    <div class="inner-wide content">
        <breadcrumbs :path="[ { link: $route.path, title: 'Уроки' } ]"/>
        <div v-if="isLoading && !errorText" class="lessons">
            <lessonCard v-for="lesson in loadersCount" :loading='true' :key="lesson" />
        </div>
        <div v-else-if="errorText || data.rows === 0" class="main-message">
            <div class="main-message__title"> Не удалось получить данные уроков :( </div>
            <show_error :error="errorText" />
            <div class="main-message__row">
                <button_box color="grey" title="Вернуться назад" @click="$router.go(-1)" />
                <button_box color="yellow" title="На главную" @click="$router.push('/')" />
            </div>
        </div>
        <div v-else class="lessons">
            <lessonCard v-for="lesson in data.rows" :key="lesson.link" v-bind="lesson" />
        </div>
    </div>
</template>

<script>
    import lessons from "../../middleware/v1/api/lessons";
    import lessonCard from "./card";
    import show_error from "../../components/show_error";
    import Viewport from "../../plugins/library/module.viewport";
    import Breadcrumbs from "../../components/layout/breadcrumbs";

    export default {
        name: "index.vue",
        data() {
            return {
                isLoading: true,
                errorLog: [],
                errorText: "",
                data: {
                    rows: [],
                    meta: {}
                }
            }
        },
        components: {Breadcrumbs, lessonCard, show_error},
        computed: {
            loadersCount() {
                let b = this.$store.state.base.breakpoint.current
                if (b === 'desktop' || b === 'hd' || b === 'compact') {
                    return 5
                } else if (b === 'tablet') {
                    return 4
                } else if (b === 'small') {
                    return 3
                } else if (b === 'mobile') {
                    return 2
                } else {
                    return 5
                }
            }
        },
        methods: {
            getData: async function () {
                this.isLoading = true

                await lessons.getLessons()
                    .then(res => {
                        try {
                            console.log(res)
                            this.data.meta.count = res.data.courses.length

                            res.data.courses.map(lesson => {
                                this.data.rows.push({
                                    title: lesson.data.title,
                                    difficulty: lesson.data.difficulty.name,
                                    volume: lesson.data.text_value || '',
                                    time: lesson.data.video_value || '',
                                    image: `https://alinamakarova.ru${ lesson.img }`,
                                    link: lesson.data.link.split('ID=')[1]
                                })
                            })
                            this.isLoading = false
                        } catch (err) {
                            this.errorText = err.toString()
                        }
                    })
                    .catch(err => {
                        this.errorText = err.toString()
                        console.log(err)
                    })

                this.isLoading = false
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="scss">
    .lessons {
        display: flex;
        flex-wrap: wrap;
        margin: 0px -10px 20px -10px;

        @include mediaLessons(xs){
            margin: 0px -5px 20px -5px;
        }
    }
</style>
