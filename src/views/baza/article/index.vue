<template>
    <div class="inner-wide content">
        <div class="article-wrapper article">
            <sidebarArticle :article="article" v-if="!isLoading" />
            <p class="article__text text">{{ rubric }}</p>
            <h2 class="article__title title">{{ article.title }}</h2>
            <div class="article__body" v-html="article.body"/>
            <related v-if="!isLoading" :list_id="article.related_articles" />
        </div>
    </div>
</template>

<script>
import baza from "@/middleware/v1/api/baza";
import Swiper from "swiper";
import related from "@/views/baza/article/related";
import sidebarArticle from "@/views/baza/article/sidebarArticle";

export default {
    name: "baza_article",
    components: {
        sidebarArticle,
        related
    },
    data() {
        return {
            isLoading: true,
            article: {},
            clicked: false,
        };
    },
    computed: {
        rubric() {
            let state = this.$store.state.baza.rubrics
            if (state.loaded && !this.isLoading) {
                let rubric = state.rows.find(row => row.id === this.article.rubric)
                return rubric ? rubric.title : ""
            }  else {
                return ""
            }
        }
    },
    methods: {
        getArticle: async function () {
            this.isLoading = true;

            await baza.getArticle(this.$route.params.id)
                .then((res) => {
                    this.article = res.data;
                    this.$store.commit('base/SET_CUSTOMTITLE', res.data.title)

                    this.$nextTick(() => {
                        this.initSliders();
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

            this.isLoading = false;
        },
        initSliders() {
            let slider = document.querySelectorAll(".article__img_carousel")

            slider.forEach((element, index) => {
                let slider_container = element.querySelector(".article__img-carousel"),
                    slider_wrapper = element.querySelector(".article__img-list"),
                    slider_button_prev = element.querySelector('.card__control-btn_prev'),
                    slider_button_next = element.querySelector('.card__control-btn_next'),
                    slider_pagination = element.querySelector('.article__img-note')

                if (slider_wrapper) {
                    element.querySelectorAll(".article__img-item").forEach((e) => {
                        e.classList.add("swiper-slide");
                    });
                    slider_container.classList.add("swiper-container");
                    slider_wrapper.classList.add("swiper-wrapper");

                    if (slider_button_next && slider_button_prev) {
                        slider_button_prev.classList.add('swiper-button-prev')
                        slider_button_next.classList.add('swiper-button-next')
                    }

                    if (slider_pagination) {
                        slider_pagination.classList.add(`swiper-pagination_${ index }`)
                    }

                    new Swiper(slider_container, {
                        slidesPerView: 1,
                        uniqueNavElements: false,
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        pagination: {
                          el: `.swiper-pagination_${ index }`,
                          type: "fraction",
                        },
                    });
                }
            });
        },
    },
    created() {
        this.getArticle();
    },
};
</script>

<style lang="scss">

.article {
    &-wrapper {
        padding: 30px 30px 60px 30px;
        background-color: #fff;
        box-shadow: 2px -1px 15px 5px rgba(0, 0, 0, 0.05);
        color: $color-black;
        margin: 0 0 30px;
        border-bottom: 2px solid $color-yellow;
        position: relative;
        @include media(wd) {
            padding-bottom: 35px;
        }
        @include media(md) {
            margin: 30px -30px;
        }
        @include media(sm) {
            padding: 35px 30px;
        }
        @include media(xs) {
            padding: 100px 30px;
            margin: 0px -30px;
        }
    }

    &__text {
        font-family: $font-main;
        font-size: 18px;
        line-height: 21px;
        color: $color-grey-text;
        text-align: center;
        margin: 0px 0px 3px 0px;
        font-weight: 400;
        @include media(wd) {
            font-size: 16px;
        }
        @include media(xs) {
            font-size: 12px;
        }
    }

    &__title {
        font-family: $font-title;
        font-size: 48px;
        line-height: 61px;
        color: #000000;
        box-sizing: border-box;
        text-align: center;
        margin: 0px 0px 55px 0px;
        @include media(wd) {
            font-size: 42px;
            margin: 0px 0px 45px 0px;
        }
        @include media(sm) {
            font-size: 30px;
            line-height: 35px;
            margin: 0px 0px 30px 0px;
        }
        @include media(xs) {
            font-size: 26px;
            margin: 0px 0px 25px 0px;
        }
    }

    &__main {
        font-family: $font-title;
        font-size: 22px;
        line-height: 28px;
        margin: 0px 0px 25px 0px;
        @include media(wd) {
            font-size: 20px;
            line-height: 26px;
            margin: 0px 0px 15px 0px;
        }
        @include media(sm) {
            font-size: 18px;
            line-height: 23px;
        }
        @include media(xs) {
            font-size: 16px;
            line-height: 20px;
        }
    }

    &__img {
        margin: 10px 0px 35px 0px;
        height: 600px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        @include media(sm) {
            max-height: 520px;
        }
        @include media(xs) {
            width: 100%;
            max-height: none;
            height: auto;
        }
    }

    &__subtitle {
        font-family: $font-title;
        font-size: 34px;
        margin: 0px 0px 30px 0px;
        @include media(wd) {
            font-size: 30px;
        }
        @include media(sm) {
            font-size: 26px;
            margin: 0px 0px 20px 0px;
        }
    }

    &-tag {
        font-weight: 400;

        &__item {
            font-size: 14px;
            line-height: 16px;
            color: $color-grey-text;
            margin: 0px 0px 12px 0px;
            cursor: pointer;

            span {
                color: $color-yellow;
            }
        }
    }
}

.article__body {
    max-width: 664px;
    margin: 0 auto;
    @include media(wd) {
        max-width: 674px;
    }
    @include media(xs) {
        max-width: 100%;
    }

    img {
        max-width: 100%;
        display: block;
    }

    .foreword {
        font-family: $font-main;
        font-size: 16px;
        line-height: 1.25;
        color: $color-black;
        margin: 20px 0;
    }

    h2:not(.title) {
        font-family: $font-title;
        font-size: 22px;
        margin: 30px 0 15px;
        @include media(md) {
            margin: 15px 0 15px;
        }
        @include media(xs) {
            font-size: 20px;
            line-height: 25px;
        }
    }

    ul {
        margin-bottom: 30px;

        li {
            font-size: 16px;
            line-height: 1.25;
            padding-left: 30px;
            margin: 20px 0;
            position: relative;
            color: #666666;
            font-family: $font-title;
            @include media(xs) {
                margin: 15px 0;
                padding-left: 25px;
            }

            &::before {
                width: 8px;
                height: 8px;
                top: 6px;
                left: 0;
                content: "";
                display: block;
                position: absolute;
                border-radius: 50%;
                background: $color-yellow;
                @include media(xs) {
                    width: 6px;
                    height: 6px;
                }
            }
        }
    }

    li {
        font-size: 16px;
        position: relative;
        color: #666666;
        font-family: $font-title;
        padding-left: 30px;
        margin: 20px 0;
        @include media(md) {
            margin: 15px 0;
        }
    }

    .ingredient {
        overflow: hidden;

        &__list {
            width: 180px;
            float: left;
            @include media(md) {
                float: none;
                width: auto;
            }
        }

        ul li {
            border-bottom: 1px solid #dbdbdb;
            margin: 0px;
            padding: 15px 0 15px 20px;
            font-size: 13px;
            font-family: $font-main;
            position: relative;
            @include media(md) {
                border: none;
                padding: 0px 0 0px 20px;
                font-size: 16px;
                margin: 15px 0px;
            }
            @include media(xs) {
                padding-left: 25px;
            }

            &::before {
                top: 20px;
                @include media(md) {
                    top: 6px;
                }
            }
        }
    }

    p {
        font-family: $font-title;
        margin: 20px 0;
        font-size: 16px;
        @include media(sm) {
            margin: 15px 0px;
        }
    }

    .ingredient__info {
        margin-left: 200px;
        @include media(md) {
            margin-left: 0px;
        }
    }

    ol {
        counter-reset: articleList;

        li::before {
            counter-increment: articleList;
            content: counter(articleList);
            display: block;
            width: 6px;
            height: 6px;
            position: absolute;
            border-radius: 50%;
            color: #ffb600;
            top: -2px;
            left: 0;
            font-size: 20px;
            font-family: "Roboto", sans-serif;
            @include media(xs) {
                font-size: 16px;
                top: 0;
            }
        }
    }

    & .article__video {
        max-width: 100%;
        margin-bottom: 30px;

        iframe,
        video {
            width: 100%;
            height: 100%;
        }

        &-note {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            padding: 12px 0;
            color: #8a8a8a;
            border-bottom: 1px solid #dbdbdb;
            overflow: hidden;

            & .time {
                float: right;
            }
        }
    }

    & .article__img-player,
    & .article__video-player {
        height: 498px;
        position: relative;
        background: #ffb600;
        padding: 5px 0px;

        iframe,
        video {
            width: 100%;
            height: 100%;
        }

        @include media(xs) {
            height: auto;
        }
    }

    & .article__img {
        &-item {
            width: 100%;
        }

        &-note {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            padding: 12px 0;
            color: #8a8a8a;
            border-bottom: 1px solid #dbdbdb;
            overflow: hidden;

            & .time {
                float: right;
            }
        }
    }

    .card__control-btn {
        z-index: 1;
        overflow: hidden;
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: 90px;
        height: 90px;
        margin-top: -45px;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5);
            overflow: hidden;
            transition: all 0.2s ease;
        }

        @include media(xs) {
            width: 56px;
            height: 56px;
        }

        &.card__control-btn_prev::before {
            left: -50%;
        }

        &.card__control-btn_prev::after {
            content: "";
            left: 7px;
            top: 33px;
            background-image: url(../../../../public/svg/sprite.svg);
            background-position: -478px -147px;
            width: 13px;
            height: 24px;
            background-repeat: no-repeat;
            position: absolute;
            transition: all 0.2s ease;
            @include media(xs) {
                background-position: -492px -219px;
                width: 8px;
                height: 15px;
                top: 21px;
            }
        }
    }

    .card__control-btn_next {
        right: 0;

        &::before {
            right: -50%;
        }

        &::after {
            content: "";
            position: absolute;
            transition: all 0.2s ease;
            right: 7px;
            background-image: url(../../../../public/svg/sprite.svg);
            background-position: -478px -195px;
            width: 13px;
            height: 24px;
            background-repeat: no-repeat;
            top: 33px;
            @include media(xs) {
                background-position: -492px -242px;
                width: 8px;
                height: 15px;
                background-repeat: no-repeat;
                top: 21px;
            }
        }
    }

    .card__control-btn_prev:hover::after {
        left: 10px;
    }

    .card__control-btn_next:hover::after {
        right: 10px;
    }

    & .article__img.article__img_carousel {
        height: auto;
        max-height: none;
    }

    & .article__img_carousel .article__img-note {
        display: block;
				text-align: right;
    }
}
</style>
