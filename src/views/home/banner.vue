<template>
    <div class="banner">
        <div class="banner__info">
            <p class="banner__category text">{{course}}</p>
            <div class="banner__title h3" v-html="title"/>
            <div class="banner__link text" @cilck="openBanner(url)">
                {{ button_text }}
                <span class="more" :style="{ backgroundImage: `url(${ basePath }/svg/index/more.svg)` }"/>
            </div>
        </div>
            <div class="banner__img">
                <img :src="`${ basePath }img/index/${ image }`" :alt="title">
            </div>
    </div>
</template>


<script>
    export default {
        name: "banner.vue",
        props: {
            title: {
                type: String,
                default: " Новый набор на Кондитер 2.0 Январь-Июнь 2020",
            },
            course: {
                type: String,
                default: "Кондитер 2.0"
            },
            button_text: {
                type: String,
                default: "Записаться на курс",
            },
            image: {
                type: String,
                default: 'cook.png'
            },
            url: {
                type: String
            }
        },
        methods: {
            openBanner(url) {
                window.open(url)
            }
        }
    };
</script>

<style lang="scss" scoped>
    .banner {
        background-color: #fff;
        padding: 20px;
        display: flex;
        flex: 0 0 calc(50% - 20px);
        justify-content: space-between;
        align-items: flex-start;
        min-height: 200px;

        @include media(sm) {
            flex-direction: column;
            padding-bottom: 60px;
            justify-content: flex-start;
        }


        &__info {
            display: flex;
            flex-direction: column;
            @include media(sm) {
                order: 2;
                min-height: 120px;
            }
        }

        &__category {
            color: $color-yellow;
            font-size: 13px;
            font-weight: 400;
            line-height: 21px;
        }

        &__title {
            color: #000000;
            font-size: 20px;
            font-weight: 400;
            line-height: 30px;
            max-width: 411px;

            flex-grow: 1;
        }

        &__link {
            color: $color-yellow;
            font-size: $fGutter;
            font-weight: 400;
            line-height: 30px;
            display: inline-block;
            position: absolute;
            bottom: 15px;
            cursor: pointer;

            .span.more {
                content: '';
                background-repeat: no-repeat;
                display: inline-block;
                background-size: 10px 10px;
                background-position: 10px 1px;
                width: 21px;
                height: 10px;
            }
        }

        &__img {
            //width: 300px;
            width: 200px;
            //margin-left: 30px;
            position: relative;
            min-width: 200px;

            &:before {
                content: '';
                height: 0;
                padding-bottom: 100%;
                width: 100%;
                display: block;
            }

            @include media(lg) {
                width: 120px;
                min-width: 120px;
            }

            @include media(sm) {
                margin-left: 0;
                order: 1;
                width: 100%;
                min-width: 100%;
                margin-bottom: 10px;
                max-width: unset;
            }
            @include media(xs) {
                // height: 227px;
            }

            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            //
            // @include media (lg){
            //     width: 132px;
            //     height: 125px;
            // }

        }
    }

</style>
