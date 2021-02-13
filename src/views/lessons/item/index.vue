<template>
    <div class="lesson-bg content" >
        <breadcrumbs :path="crumbs" class="inner-wide" />
        <div v-if="isLoading" class="loader" />
        <div v-else-if="!errorText" class="lesson">
            <div class="inner-wide lesson__inner">
                <div class="lesson__description lesson-description" id="lesson-description">
                    <gallery class="lesson-description__gallery" :imgs="data.gallery"/>
                    <div class="lesson-description__info">
                        <div class="lesson-description__text lesson-about">
                            <p class="lesson-about__title">Автор курса:</p>
                            <div class="lesson-about__author">
                                <img class="lesson-about__author--img" :src="`${ basePath }img/lessons/alina2.jpg`"/>
                                <span>Алина Макарова</span>
                            </div>
                            <div class="lesson-about__info">
                                <p class="lesson-about__text" v-html="data.about" />
                            </div>
                        </div>
                        <ticket v-if="!sidebarSticky"/>
                    </div>
                </div>
                <div class="lesson__detail lesson-detail" id="lesson-detail">
                    <div class="inner-wide lesson-detail__wrapper">
                        <div v-if="data.documents.length > 0">
                            <h2 class="lesson-detail__title">Документы</h2>
                            <div class="lesson-detail__documents">
                                <doc v-for="doc in data.documents" :key="doc.link" class="lesson-detail__documents-item"
                                     :href="doc.link"
                                     :title="doc.name"
                                     :weight="doc.note"
                                     :type="doc.type"
                                     :backgroundDark="true"/>
                            </div>
                        </div>
                        <div v-if="data.videos.length > 0">
                            <h2 class="lesson-detail__title">Видео</h2>
                            <videobox class="lesson-detail__video" v-for='video in data.videos'
                                      :key='video.type + video.id' :type="video.type" :id="video.id"
                                      :name="video.description"/>
                        </div>
                    </div>
                </div>

                <notes :lesson="data" />

                <div class="lesson__sidebar--wrap">
                    <div class="lesson__sidebar-wrapper lesson__sidebar--sticky" v-if="sidebarSticky">
                        <ticket/>
                    </div>
                </div>
            </div>
            <div class="inner-wide">
                <reviews :imgs="data.reviews"/>
            </div>
            <lesson_footer />
        </div>
        <div v-else class="main-message inner">
            <div class="main-message__title"> {{ errorText }} :( </div>
            <div class="main-message__row">
                <button_box color="grey" title="Вернуться назад" @click="$router.go(-1)" />
                <button_box color="yellow" title="На главную" @click="$router.push('/')" />
            </div>
        </div>
    </div>
</template>

<script>
    import notes from "@/views/lessons/item/notes";
    import lessons from "../../../middleware/v1/api/lessons";
    import doc from "../../../components/functional/document";
    import videobox from "../../../components/functional/videobox";
    import ticket from "./ticket";
    import gallery from './gallery';
    import {mapState} from "vuex";
    import Reviews from "./reviews";
    import lesson_footer from "./footer";
    import breadcrumbs from "@/components/layout/breadcrumbs";

    export default {
        name: "lesson",
        components: {breadcrumbs, notes, Reviews, doc, videobox, ticket, gallery, lesson_footer },
        data() {
            return {
                isLoading: true,
                errorText: null,
                activeTab: 'description',
                purchased: true,
                defined: true,
                data: {
                    title: "",
                    about: "",
                    gallery: [],
                    documents: [],
                    videos: [],
                    review: {
                        frameText: "",
                        whatLearn: [],
                        commentary: []
                    },
                    reviews: [],
                },
                windowWidth: 0
            };
        },
        computed: {
            sidebarSticky() {
                return this.windowWidth > 950
            },
            crumbs() {
                if (this.isLoading) {
                    return []
                } else {
                    return [
                        {
                            title: 'Уроки',
                            link: { name: 'lessons' }
                        },
                        {
                            title: this.data.title,
                            link: this.$route
                        }
                    ]
                }
            },
            ...mapState({
                viewPort: (state) => state.base.breakpoint.current,
            }),
        },
        methods: {
            getWindowWidth() {
                this.windowWidth = window.innerWidth
                window.addEventListener('resize', () => {
                    this.windowWidth = window.innerWidth
                })
            },
            getLesson() {
                document.title = "Загрузка...";
                this.$store.commit('base/SET_CUSTOMTITLE', 'Загрузка...')

                this.errorText = null
                this.isLoading = true

                lessons.getLesson(this.$route.params.id)
                    .then(res => {
                        console.log(res.data)
                        if (!res.data.status_code && res.data.title) {
                            let data = res.data

                            document.title = data.title
                            this.$store.commit('base/SET_CUSTOMTITLE', data.title)
                            this.documentTitle = data.title

                            this.parseLesson(data)

                        } else {
                            if (res.data.status_code === '418') {
                                this.errorText = 'Урок не приобретен'
                            } else {
                                this.errorText = 'Урок не найден'
                            }
                            this.$store.commit('base/SET_CUSTOMTITLE', 'Ошибка')
                            document.title = 'Ошибка'
                        }

                        this.isLoading = false
                    })
                    .catch(() => {
                        this.$store.commit('base/SET_CUSTOMTITLE', 'Ошибка')
                        document.title = 'Ошибка'
                        this.errorText = 'Произошла ошибка'

                        this.isLoading = false
                    })
            },

            parseLesson(data) {
                this.data.title = data.title
                this.data.about = data.about_course

                let galleryHtml = data.image.master_1.result.split('<img')
                galleryHtml.map((item, index) => {
                    if (index !== 0) {
                        this.data.gallery.push(item.split('src="')[1].split('"')[0])
                    }
                })

                if (data.document.files) {
                    data.document.files.map(doc => {
                        this.data.documents.push(doc)
                    })
                }
                (["oferta", "pdf", "pdf1", "pdf2"]).map(item => {
                    if (data.document[item]) {
                        this.data.documents.push(data.document[item])
                    }
                })
                console.log(this.data.documents)

                if (data.video) {
                    if (data.video.vimeo) {
                        this.data.videos.push({
                            type: 'vimeo',
                            id: data.video.vimeo.link.split('/').pop(),
                            description: data.video.vimeo.description
                        })
                    }
                    if (data.video.vimeos) {
                        data.video.vimeos.map(video => {
                            this.data.videos.push({
                                type: 'vimeo',
                                id: video.link.split('/').pop(),
                                description: video.description
                            })
                        })
                    }
                    if (data.video.youtube) {
                        this.data.videos.push({
                            type: 'youtube',
                            id: data.video.youtube.link.split('/').pop(),
                            description: data.video.youtube.description
                        })
                    }
                }

                this.data.reviews = data['course-review'].review
                this.data.review.frameText = data['course-review'].blockquote
                this.data.review.whatLearn = data['course-review'].whatlearn
                this.data.review.commentary = data['course-review'].commentary
            }
        },
        created() {
            this.getWindowWidth()
            this.getLesson()
        },
    };
</script>

<style lang="scss">
    body {
        overflow-x: hidden;
    }

    .lesson {
        margin-top: 30px;

        @include mediaLessons(lg) {
            margin-top: 20px;
        }

        &-bg {
            background: #f8f8f8;
            padding-bottom: 0;
        }


        &-prim {
            margin: 20px 0;
            color: $color-grey-text;
            padding-right: 474px;
            font-size: $fGutter;
            width: 100%;

            @include mediaLessons(wd) {
                padding-right: 371px;
            }
            @include mediaLessons(lg) {
                padding: 0px 271px 0px 0px;
                font-size: 14px;
            }
            @include mediaLessons(md) {
                padding-right: 0px;
            }

            &__text {
                padding: 20px 25px;
                border: 1px solid #ffb600;
                border-radius: 10px;
                margin: 40px 0;
            }

            &__learn {
                font-size: 16px;
                font-weight: 300;
                line-height: 1.5;
                color: #666;

                @include mediaLessons(lg) {
                    font-size: 14px;
                }
                @include mediaLessons(md) {
                    font-size: 16px;
                }
                @include mediaLessons(sm) {
                    font-size: 14px;
                }

                &-title {
                    font-size: 24px;
                    font-family: $font-title;
                    color: #000;
                    font-weight: 400;
                    margin: 30px 0 20px;

                    @include mediaLessons(lg) {
                        font-size: 20px;
                    }
                    @include mediaLessons(md) {
                        font-size: 24px;
                    }
                    @include mediaLessons(sm) {
                        font-size: 20px;
                    }
                }

                &-list {
                    margin: 20px 0px;

                    li {
                        margin: 10px 0;
                        position: relative;
                        padding-left: 20px;

                        @include mediaLessons(lg) {
                            margin: 5px 0;
                        }
                        @include mediaLessons(md) {
                            margin: 10px 0;
                        }
                        @include mediaLessons(sm) {
                            margin: 5px 0;
                        }

                        &::before {
                            content: "";
                            display: block;
                            position: absolute;
                            width: 6px;
                            height: 6px;
                            background: #ffb600;
                            border-radius: 50%;
                            top: 8px;
                            left: 0;
                        }
                    }
                }
            }
        }

        &__detail {
            background: #44525f;
            padding: 70px 0;
            width: 100vw;
            @include mediaLessons(wd) {
                padding: 50px 0px;
            }
            @include mediaLessons(lg) {
                padding: 30px 0px;
            }
            @include mediaLessons(sm) {
                padding: 30px 0px;
            }
        }

        &__sidebar {
            width: 451px;
            @include mediaLessons(wd) {
                max-width: 358px;
            }
            @include mediaLessons(lg) {
                max-width: 256px;
            }
            @include mediaLessons(md) {
                max-width: 412px;
                position: static !important;
                width: auto !important;
                transform: none !important;
            }
            @include mediaLessons(sm) {
                max-width: 100%;
                margin: 0px 0px 20px 0px;
            }

            &--sticky {
                position: sticky;
                transform: translate3d(0px, 0px, 0px);
                top: 30px;
                float: right;
                right: 0;
                z-index: 5;

                @include mediaLessons(lg) {
                    //top: 90px;
                }
            }

            &--wrap {
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
            }
        }

        &__description {
            display: flex;
            position: relative;
            align-items: flex-start;
            padding: 0 0 50px;
            width: 100%;

            @include mediaLessons(md) {
                flex-direction: column;
            }
            @include mediaLessons(lg) {
                padding: 0 0 20px;
            }
        }
    }

    .lesson__inner {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .lesson-ticket {
        color: $color-black;

        hr {
            box-shadow: none;
            height: 1px;
            border: 0;
            background: #ccc;
            display: block;
            margin: 20px 0;
        }

        &__inner {
            background: #fff;
            padding: 25px 30px;
            box-shadow: 0 2px 4px hsla(0, 0%, 40%, 0.1);

            @include mediaLessons(lg) {
                padding: 15px 20px;
            }

            @include mediaLessons(md) {
                padding: 25px 30px;
            }
        }

        &__call {
            text-align: center;
        }

        &__call-title {
            font-size: 24px;
            color: $color-yellow;
            font-family: $font-title;
            line-height: $fLineHeight;
            margin-bottom: 20px;
            @include mediaLessons(sm) {
                font-size: 16px;
            }
        }

        &__call-note {
            color: $color-grey-text;
            margin-bottom: 5px;
            font-size: 13px;
            font-weight: 300;
        }

        &__call-hash {
            font-size: 24px;
            font-family: $font-title;
            @include mediaLessons(sm) {
                font-size: 16px;
            }
        }

        &__info {
        }

        &__description {
            font-size: 13px;
            color: $color-grey-text;
            font-weight: 300;
            @include mediaLessons(sm) {
                font-size: 12px;
            }

            li {
                position: relative;
                padding-left: 20px;
                margin: 5px 0;
                line-height: 1.5;

                &::before {
                    content: "";
                    width: 13px;
                    height: 13px;
                    position: absolute;
                    top: 2px;
                    left: 0;
                    background-image: url(../../../../public/img/lessons/check.svg);
                }
            }

            a {
                color: $color-yellow;
            }
        }

        &__action {
            text-align: center;
        }

        &__note {
            font-size: 13px;
            margin: 15px 0;
            font-weight: 300;
            color: #666;
        }
    }

    .lesson-detail {
        &__title {
            font-size: 24px;
            font-family: $font-title;
            color: #fff;
            margin: 0px 0px 25px 0px;
            @include mediaLessons(sm) {
                font-size: 20px;
                margin-bottom: 15px;
            }
        }

        &__documents {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -10px;

            &-item {
                margin: 0 10px 20px;
                @include media(xs) {
                    margin: 0 5px 10px;
                }

                &_dark {
                    color: #fff;
                }
            }
        }

        &__video {

            width: 100%;
            margin: 0px 0px 20px 0px;
        }

        &__wrapper {
            padding-right: 475px;
            @include mediaLessons(wd) {
                padding-right: 380px;
            }
            @include mediaLessons(lg) {
                padding-right: 275px;
            }
            @include mediaLessons(md) {
                padding-right: 0px;
            }

        }
    }

    .lesson-description {
        color: $color-grey-text;
        font-size: $fGutter;

        &__gallery {
        }

        &__text {
        }

        &__info {
            display: flex;
            @include mediaLessons(md) {
                margin: 30px 0px 0px 0px;
            }
            @include mediaLessons(sm) {
                flex-direction: column;
            }
        }
    }

    .lesson-about {
        width: calc(100% - 358px);
        padding: 0px 40px;
        // @include media(wd) {
        //     width: calc(100% - 358px);
        // }
        // @include media(lg) {
        //     width: calc(100% - 256px);
        // }
        @include mediaLessons(lg) {
            padding: 0 40px 0 40px;
            width: 296px;
            margin: 0px 0px -20px 0px;
            order: 2;
        }
        @include mediaLessons(md) {
            width: 50%;
        }
        @include mediaLessons(sm) {
            width: 100%;
            padding: 0 0 0 0;
        }

        &__title {
            font-size: $fGutter;
            color: $color-black;
            margin-bottom: 20px;
            font-weight: 400;
            @include mediaLessons(lg) {
                font-size: 14px;
            }
            @include mediaLessons(md) {
                font-size: 16px;
            }
        }

        &__author {
            margin: 10px 0px;
            display: flex;
            align-items: center;
            @include mediaLessons(lg) {
                font-size: 14px;
            }
            @include mediaLessons(md) {
                font-size: 16px;
            }
        }

        &__author--img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 20px;
        }

        &__text {
            margin: 0px 0px 20px 0px;
            @include mediaLessons(lg) {
                font-size: 14px;
            }
            @include mediaLessons(md) {
                font-size: 16px;
            }
        }
    }

    .main-message {
        display: flex;
        flex-direction: column;

        &__title {
            font-size: 24px;
            font-family: $font-title;
            color: #000;
            font-weight: 400;
            margin: 30px 0 20px;

            @include mediaLessons(lg) {
                font-size: 20px;
            }
            @include mediaLessons(md) {
                font-size: 24px;
            }
            @include mediaLessons(sm) {
                font-size: 20px;
            }
        }

        &__row {
            display: flex;
            justify-content: flex-start;
        }
    }
</style>
