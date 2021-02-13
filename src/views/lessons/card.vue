<template>
    <router-link tag="div" class="lessons-card" :to="`/lessons/${ link }`">
        <img :src="image" style="width:100%" class="lessons-card__photo" v-show="!loading">
        <span class="lessons-card__photo loading" v-show="loading"/>
        <div class="lessons-card__description">
            <p class="lessons-card__name" :class="loadingClass" v-text="title" />
            <ul class="lessons-card__profile">
                <li class="lessons-card__item lessons-card__item--level" :class="loadingClass"
                    :style="{ 'background-image': `url(${ basePath }svg/lessons/level.svg)` }"
                    v-show="difficulty || 1 === 1">
                    Сложность:
                    <span :style="{ 'color': difficultyColor }">
                                {{ difficulty || '' }}
                            </span>
                </li>
                <li class="lessons-card__item lessons-card__item--time" :class="loadingClass"
                    :style="{ 'background-image': `url(${ basePath }svg/lessons/play.svg)` }"
                    v-show="time || 1 === 1">
                    {{ time }}
                </li>
                <li class="lessons-card__item lessons-card__item--pages" :class="loadingClass"
                    :style="{ 'background-image': `url(${ basePath }svg/lessons/pages.svg)` }"
                    v-show="volume || 1 === 1">
                    {{ volume}}
                </li>
            </ul>
            <button_box v-if='!loading' title='Смотреть' color="violet" :button-class="loadingClass" class="lessons-card__button" />
        </div>
    </router-link>
</template>

<script>
    export default {
        name: "card.vue",
        props: {
            title: {
                type: String,
                default: 'Урок по Cake-Pops'
            },
            difficulty: {
                type: String,
                default: ''
            },
            time: {
                type: String,
                default: ''
            },
            volume: {
                type: String,
                default: ''
            },
            image: {
                type: String,
                default: ''
            },
            link: {
                type: String,
                default: null
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            difficultyColor() {
                let dif = this.difficulty ? this.difficulty.trim().toLowerCase() : ''
                if (dif === 'лёгкий') {
                    return '#639a00'
                } else if (dif === 'средний') {
                    return '#ffb600'
                } else if (dif === 'сложный') {
                    return '#ff5900'
                }
                return 'inherit'
            },
            loadingClass() {
                if (this.loading) {
                    return 'loading'
                } else {
                    return ''
                }
            }
        }


    }
</script>

<style lang="scss" >
    .lessons-card {
        flex: 0 0 calc(20% - 20px);
        max-width: 294px;
        margin: 20px 10px 0 10px;
        box-shadow: 0 2px 4px rgba(102, 102, 102, 0.1);
        background-color: #ffffff;
        height: 100%;
        position: relative;

        @include mediaLessons(lg) {
            flex: 0 0 calc(25% - 20px);
        }
        @include mediaLessons(md) {
            flex: 0 0 calc(25% - 20px);
        }
        @include mediaLessons(sm) {
            flex: 0 0 calc(33.3333% - 20px);
        }
        @include mediaLessons(xs) {
            flex: 0 0 calc(50% - 10px);
            margin: 20px 5px 0px 5px;
        }
        @media screen and (max-width: 350px) {
            flex: 0 0 calc(100% - 10px);
        }
        // 	@media screen and (max-width: 380px) {
        //   flex: 0 0 calc(100% - 20px)
        // }

        &__photo {
            width: 100%; //223px;
            height: 194px;
            border-radius: 0px !important;
            object-fit: cover;
            @include mediaLessons(wd) {
                height: 137px;
            }
            @include mediaLessons(lg) {

            }
            @include mediaLessons(md) {
                height: 146px;
            }
            @include mediaLessons(xs) {
                height: 100px;
            }
            // 					@media screen and (max-width: 380px) {
            // 					height: 146px;
            // }
        }

        &__button {
            position: absolute;
            bottom: 10px;
        }

        &__description {
            padding: 15px 20px;
            @include mediaLessons(wd) {
                padding: 10px;
            }
            @include mediaLessons(sm) {
                padding: 10px 15px;
            }
            @include mediaLessons(xs) {
                padding: 10px;
            }
        }

        &__name {
            color: $color-black;
            font-family: $font-title;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.3333em;
            min-height: 2.6666em;
            margin-bottom: 10px;
            @include mediaLessons(xs) {
                font-size: 14px;
                line-height: 17px;
                margin-bottom: 9px;
            }
        }

        &__item {
            color: $color-grey-light;
            font-family: $font-main;
            font-size: 12px;
            font-weight: 300;
            line-height: 21px;
            padding: 0px 0px 0px 20px;
            background-repeat: no-repeat;
            height: 21px;
            background-position: 0px 3px;

            &.loading {
                margin-bottom: 3px;
                width: 60%;
            }

            .card__item--level {
                display: flex;
            }
        }

        &__profile {
            padding: 15px 0px 45px 0px;

            @include mediaLessons(sm) {
                padding: 10px 0px 45px 0px;
            }
        }

    }
</style>
