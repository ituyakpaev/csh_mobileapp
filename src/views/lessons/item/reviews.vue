<template>
    <div class="lesson-reviews" v-show="imgs.length > 0">
        <div class="lesson-reviews__title h1" v-text="'Отзывы учеников'" />

        <div v-swiper:reviews="options" class="swiper-container lesson-reviews__swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide lesson-reviews__slide" v-for="img in imgs" :key="img">
                    <img style="width: auto; height: 100%" :src="`https://alinamakarova.ru/${ img }`">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reviews",
        props: {
            imgs: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                options: {
                    spaceBetween: 20,
                    slidesPerView: 'auto',
                    loop: false,
                    navigation: {
                        prevEl: '.lef',
                        nextEl: '.rig',
                    }
                },
            }
        },
    }
</script>

<style lang="scss">
    .lesson-reviews {
        &__title {
            font-size: 36px;
            margin-bottom: 25px;

            @include mediaLessons(lg) {
                font-size: 24px;
            }
            @include mediaLessons(sm) {
                font-size: 20px;
            }
        }

        &__swiper {
            overflow: visible;
        }

        &__slide {
            width: max-content!important;

            @include mediaLessons(wd) {
                height: 500px;
            }
            @include mediaLessons(lg) {
                height: 455px;
            }
        }
    }

</style>
