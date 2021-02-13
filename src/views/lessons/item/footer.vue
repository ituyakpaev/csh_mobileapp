<template>
    <div class="lesson__footer">
        <div class="lesson-contacts inner-wide" id="notes">
            <div class="lesson-contacts__main">
                <p class="lesson-contacts__title">Смотрите ещё больше отзывов и работ учеников в Инстаграм по
                    хэштегам:</p>
                <div class="lesson-contacts__tag">
                    <a href="#" target="_blank">
                        <p class="lesson-contacts__tag-item">#кондитер_отадоя</p>
                    </a>
                    <a href="#" target="_blank">
                        <p class="lesson-contacts__tag-item">#am_pastry</p>
                    </a>
                </div>
            </div>
            <div class="lesson-contacts__subscribe">
                <div class="lesson-contacts__subscribe-item">
                    <div class="lesson-contacts__subscribe-image">
                        <img class="lesson-contacts__img" :src="`${ basePath }img/lessons/alina1.jpg`" >
                        <div class="lesson-contacts__subscribe-ico" :style="{ 'background-image': `url(${ basePath }svg/inst.svg)`}">
                        </div>
                    </div>
                    <div class="lesson-contacts__subscribe-info">
                        <div class="lesson-contacts__subscribe-title">
                            Подписывайтесь на Инстаграм
                            <a :href="soc.inst.link" target="_blank">@cake_school</a>
                        </div>
                        <p class="lesson-contacts__subscribe-text">и следите за самыми интересными постами</p>
                    </div>
                </div>
                <div class="lesson-contacts__subscribe-item">
                    <div class="lesson-contacts__subscribe-image">
                        <img class="lesson-contacts__img" :src="`${ basePath }img/lessons/alina2.jpg`"/>
                        <div class="lesson-contacts__subscribe-ico" :style="{ 'background-image': `url(${ basePath }svg/vk.svg)`}">
                        </div>
                    </div>
                    <div class="lesson-contacts__subscribe-info">
                        <div class="lesson-contacts__subscribe-title">
                            Вступайте в группу
                            <a :href="soc.vk.link" target="_blank">ВКонтакте</a>
                        </div>
                        <div class="lesson-contacts__subscribe-text">будьте в курсе актуальных новостей</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="lesson-footer">
            <div class="inner-wide lesson-footer__inner">
                <div class="lesson-footer__logo">
                    <img :src="`${ basePath }svg/logo.svg`" />
                </div>
                <div class="lesson-footer-social">
                    <div class="lesson-footer-social__title">
                        Мы в соц.сетях
                    </div>
                    <div class="lesson-footer-socials">
                        <a  class="lesson-footer-socials__item"
                                v-for="(s, index) in soc" :key="index" :href="s.link" :style="{ backgroundImage: `url(${ basePath }svg/${ s.svg })` }" />
                    </div>
                </div>
                <div class="lesson-footer__copyright">
                    © 2014—2020 Cake School. Все права защищены. Использование материалов с сайта alinamakarova.ru допускается с обязательным уведомлением автора.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footer.vue",
        data() {
            return {
                soc: {
                    vk: {
                        link: 'https://vk.com/kursy_konditera',
                        svg: 'vk.svg'
                    },
                    inst: {
                        link: 'https://www.instagram.com/cake_school/',
                        svg: 'inst.svg'
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .lesson-footer {
        background: #44525f;
        color: #a2a9af;
        padding: 20px 0;
        font-size: 13px;
        font-weight: 300;
        display: flex;

        &__inner {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        &-social {
            display: flex;

            &__title {
                @include mediaLessons(md) {
                    display: none;
                }
            }
        }

        &-socials {
            display: flex;

            &__item {
                margin-left: 20px;
                height: 20px;
                width: 20px;
                background-size: contain;

                @include mediaLessons(md) {
                    width: 25px;
                    height: 25px;
                }
            }
        }

        &__copyright {
            width: 50%;
            flex-basis: 50%;

            @include mediaLessons(sm) {
                margin-top: 10px;
                width: 100%;
                flex-basis: 100%;
            }
        }
    }

    .lesson-contacts {
        font-family: $font-title;
        display: flex;

        @include mediaLessons(md) {
            flex-direction: column;
        }

        &__main {
            max-width: 922px;
        }

        &__title {
            font-size: 36px;
            @include mediaLessons(lg) {
                font-size: 30px;
            }
        }

        &__tag {
            font-size: 36px;
            @include mediaLessons(lg) {
                font-size: 30px;
            }
        }

        &__tag-item {
            color: $color-yellow;
            margin: 20px 0;
        }

        &__subscribe {
            display: flex;
        }

        &__subscribe-item {
            text-align: center;
            display: inline-block;
            width: 50%;
            padding: 0 5px 20px;
            box-sizing: border-box;
            @include mediaLessons(md) {
                display: inline-flex;
            }
            @include mediaLessons(sm) {
                display: inline-block;
            }
        }

        &__subscribe-image {
            width: 178px;
            position: relative;
            margin: 0 auto 20px;
            @include mediaLessons(lg) {
                width: 144px;
            }
            @include mediaLessons(sm) {
                width: 130px;
            }

            img {
                width: 178px;
                height: 178px;
                border-radius: 50%;
                object-fit: cover;
                @include mediaLessons(lg) {
                    width: 144px;
                    height: 144px;
                }
                @include mediaLessons(md) {
                    width: 124px;
                    height: 124px;
                }
                @include mediaLessons(sm) {
                    width: 130px;
                    height: 130px;
                }
            }
        }

        &__subscribe-ico {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #fff;
            font-size: 0;
            text-align: center;

            background-size: 30px 30px;
            background-repeat: no-repeat;
            background-position: center center;
            @include mediaLessons(lg) {
                background-size: 22px 22px;
            }

            @include mediaLessons(lg) {
                width: 42px;
                height: 42px;
            }

            svg {
                display: inline-block;
                vertical-align: middle;
                width: 50%;
                height: 50%;
            }
        }

        &__subscribe-info {
            padding: 0 10px;
        }

        &__subscribe-title {
            font-family: $font-title;
            font-size: 18px;
            line-height: $fLineHeight;
            color: $color-yellow;
            margin-bottom: 10px;
            @include mediaLessons(xs) {
                font-size: 16px;
            }
        }

        &__subscribe-text {
            font-size: $fGutter;
            font-weight: 300;
            color: $color-grey;
            font-family: $font-main;
            @include mediaLessons(sm) {
                font-size: 14px;
            }
        }
    }

    .lesson__footer {
        margin-top: 80px;
        @include mediaLessons(lg) {
            margin-top: 50px;
        }
        @include mediaLessons(md) {
            margin-top: 20px;
        }
    }
</style>
