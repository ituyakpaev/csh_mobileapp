<template>
    <div class="inner content">
        <breadcrumbs :path="[]"/>
        <div class="home">
            <div class="home-banners" v-if="false">
                <swiper :options="banners.options" class="home-banners__inner">
                    <swiper-slide v-for="banner in banners.banners" :key="banner.image">
                        <banner v-bind="banner"/>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="home-lessons" v-if="lessons.isLoading || lessons.list.length > 0">
                <div class="h1">
                    Уроки
                </div>
                <div class="home-lessons__inner" v-if="lessons.isLoading">
                    <swiper :options="lessons.options">
                        <swiper-slide v-for="lesson in 5" :key="lesson" class="home-lessons__lesson">
                            <lesson_card :loading="true"/>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="home-lessons__inner" v-else>
                    <swiper :options="lessons.options">
                        <swiper-slide v-for="lesson in lessons.list" :key="lesson.link" class="home-lessons__lesson">
                            <lesson_card v-bind="lesson"/>
                        </swiper-slide>
                        <swiper-slide class="home-view " v-if="lessons.count > 4">
                            <router-link tag="div" :to="{ name: 'lessons' }" class="lessons-card home-view__inner"
                                         style="height: calc(100% - 20px);">
                                <div class="home-view__icon" :style="{ backgroundImage: `url(${ basePath }/svg/arrow-right.svg)`}" />
                                <div class="home-view__text text">
                                    Все онлайн-уроки
                                </div>
                            </router-link>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="home-courses" v-if="!courses.isLoading">
                <div class="h1">
                    Курсы
                </div>
                <div class="home-courses__inner" v-if="$store.state.base.breakpoint.current === 'mobile'">
                    <swiper :options="courses.options">
                        <swiper-slide v-for="course in courses.list" :key="course.id">
                            <course_card :item="course"/>
                        </swiper-slide>
                        <swiper-slide class="course-card__item home-view" v-if="courses.count > 3">
                            <!-- <div class="course-card__item home-view">-->
                            <router-link tag="div" :to='{ name: "courses-all" }' class="course-card__inner home-view__inner">
                                <div class="home-view__icon"
                                     :style="{ backgroundImage: `url(${ basePath }/svg/arrow-right.svg)`}"/>
                                <div class="home-view__text text">
                                    Все онлайн-курсы
                                </div>
                            </router-link>
                            <!-- </div> -->
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="home-courses__inner" v-else>
                    <course_card v-for="course in courses.list" :key="course.id" :item="course"/>
                    <div class="course-card__item home-view">
                        <router-link tag="div" :to='{ name: "courses-all" }' class="course-card__inner home-view__inner">
                            <div class="home-view__icon"
                                 :style="{ backgroundImage: `url(${ basePath }/svg/arrow-right.svg)`}"/>
                            <div class="home-view__text text">
                                Все онлайн-курсы
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumbs from "../../components/layout/breadcrumbs";
    import banner from "./banner";
    import course_card from '../courses/course-card'
    import lesson_card from "../lessons/card";
    import courseApi from '../../middleware/v1/api/course'
    import lessonsApi from '../../middleware/v1/api/lessons'

    export default {
        name: "home.vue",
        components: {Breadcrumbs, banner, course_card, lesson_card},
        data() {
            return {
                banners: {
                    banners: [
                        {
                            title: 'Базовый курс для начинающих кондитеров.',
                            course: 'Выход на рынок',
                            image: 'vihod_na_rinok.jpg',
                            url: 'http://cake-school.com/base?utm_source=lk&utm_medium=homepage&utm_campaign=banner'
                        },
                        {
                            title: 'Современный декор тортов',
                            course: 'Курс по современному декору тортов',
                            image: 'decor.jpg',
                            url: 'http://cake-school.com/decor?utm_source=lk&utm_medium=homepage&utm_campaign=banner'
                        }
                    ],
                    options: {
                        slidesPerView: 'auto',
                        spaceBetween: 10,
                        breakpoints: {
                            568: {
                                slidesPerView: 2
                            }
                        }
                    },
                },
                courses: {
                    isLoading: true,
                    list: [],
                    count: 0,
                    options: {
                        slidesPerView: 'auto',
                        spaceBetween: 0
                    }
                },
                lessons: {
                    isLoading: true,
                    list: [],
                    count: 0,
                    options: {
                        slidesPerView: 'auto',
                        slideVisibleClass: 'visible',
                        watchSlidesProgress: true,
                        watchSlidesVisibility: true,
                        spaceBetween: 10,
                        breakpoints: {
                            // when window width is >= 320px

                            // when window width is >= 480px
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 10
                            },
                            // when window width is >= 640px
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 10
                            },
                            1200: {
                                slidesPerView: 5,
                            }
                        }
                    },

                }
            }
        },
        methods: {
            loadLessons: async function () {
                this.lessons.isLoading = true
                await lessonsApi.getLessons()
                    .then(res => {
                        this.lessons.count = res.data.courses.length

                        res.data.courses.slice(0, 4).map(lesson => {
                            this.lessons.list.push({
                                title: lesson.data.title,
                                difficulty: lesson.data.difficulty.name,
                                volume: lesson.data.text_value || '',
                                time: lesson.data.video_value || '',
                                image: `https://alinamakarova.ru${lesson.img}`,
                                link: lesson.data.link.split('ID=')[1]
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })

                this.lessons.isLoading = false
            },
            loadCourses() {
                courseApi.getList()
                    .then(res => {
                        this.courses.count = this.courses.list.length
                        this.courses.list = res.items.slice(0, 3)
                        this.courses.isLoading = false
                    })
            }
        },
        created() {
            this.loadCourses()
            this.loadLessons()
        }
    }
</script>

<style lang="scss">
    .home {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding-bottom: 50px;

        @include media(xs) {
            flex-wrap: nowrap;
        }

        &-banners {
            margin-top: 15px;

            .swiper-container {
                overflow: visible;

                .swiper-slide {
                    @include media(xs) {
                        width: 350px;
                        //max-width: calc(100vw - 60px);
                        width: calc(100% - 10px);
                    }
                }
            }
        }

        &-courses {
            margin: 30px 0 0;

            &__inner {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                margin: 0 -10px;

                .swiper-container {
                    overflow: visible;
                }

                .swiper-slide {
                    @include media(xs) {
                        width: calc(100vw - 40px);
                    }
                }

                .home-view {
                    @include media(sm) {
                        width: 100%;
                        height: 300px;
                    }
                }
            }
        }

        &-lessons {
            margin: 30px 0 0;

            &__inner {
            }

            &__lesson .lessons-card {
                margin-right: 0;
                margin-left: 0;
            }

            .swiper-container {
                overflow: visible;
            }

            .swiper-slide {
                opacity: .15;
                transition: opacity .3s ease;
                will-change: opacity;

                @include media(xs) {
                    width: calc(50vw - 10px);
                }

                &.visible {
                    opacity: 1;
                }
            }
        }

        &-view {
            height: unset;

            &__inner {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                padding: 10px;

            }

            &__text {
                color: #141414;
                font-family: $font-main;
                font-size: 16px;
                font-weight: 400;
                text-align: center;
                line-height: 21px;
                @include media(sm) {
                    font-size: 14px;
                }
            }

            &__icon {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background-color: #ffc840;
                margin: 0px 0px 20px 0px;
                background-repeat: no-repeat;
                background-position: center center;
                transition: all 0.3s ease 0s;

                &:hover {
                    background-color: $color-yellow;
                }
            }
        }
    }

    .home-banners .swiper-slide {
        //width: 280px;
    }

    .home-lessons__inner .swiper-slide {
        //width: 135px;
    }
</style>
