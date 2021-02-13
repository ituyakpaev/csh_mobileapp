<template>
    <div class="baza-rubrics inner-wide" v-if="!rubrics.loading">
        <div class="swiper-container ncvkjfdnvkjdf"  >
            <div class="swiper-wrapper">
                <router-link class="swiper-slide baza-rubrics__main" to="all">Все рубрики</router-link>

                <router-link class="swiper-slide baza-rubrics__link" exact-active-class="baza-rubrics__link--active"
                             v-for="rubric in rubrics.rows" :key="rubric.title" :to="`/baza?rubric_id=${ rubric.id }`">
                    {{ rubric.title }}
                </router-link>
            </div>
        </div>
        <div class="baza-rubrics__input">
            <img src="../../../assets/svg/search.svg" alt="search"/>
            <input v-model="search" @keydown.enter="pushSearch" type="text" placeholder="Поиск по статьям..." class="baza-rubrics__search">
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from "swiper";

export default {
    name: "submenu.vue",
    data() {
        return {
            search: '',
            openedArticle: {
                isLoading: true,
                article: {},
                relatedArticles: {
                    rows: [],
                    isLoading: true
                },
                nextArticle: {
                    article: {},
                    isLoading: true
                }
            }
        }
    },
    computed: mapState({
        rubrics: state => state.baza.rubrics
    }),
    methods: {
        pushSearch() {
            this.$router.push(`/baza?q=${ this.search }`)
        },
        swiperInit() {
            console.log('sw init')
            new Swiper(".ncvkjfdnvkjdf", {
                slidesPerView: 'auto',
                spaceBetween: 0,
                simulateTouch: false
            })
        }
    },
    created() {
        if (this.rubrics.rows.length === 0) {
            this.$store.dispatch('baza/getRubrics')
        }

        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'baza/setRubrics') {
                this.swiperInit()
            }
        })
    },

};
</script>

<style scoped lang="scss">
.baza-rubrics {
    padding: 0 0 15px;
    background-color: #fff;

    &__link {
        font-family: $font-main;
        font-size: 15px;
        line-height: 18px;
        color: $color-grey-text;
        width: max-content;
        margin: 0px 10px 0px 0px;
        font-weight: 400;
        padding: 2px 12px;
        @include media(wd) {
            font-size: 13px;
            line-height: 15px;
            margin: 0;
        }
        @include media(md) {
            font-size: 11px;
            margin: 0px 0px 10px 0px;
        }

        &--active {
            background-color: $color-yellow;
            color: #fff;
            padding: 2px 12px;
        }
    }

    &__main {
        font-size: 15px;
        line-height: 18px;
        color: #141414;
        font-weight: 400;
        width: max-content;
        padding: 2px 18px 2px 0px;
        border-right: 2px solid $color-yellow;
        margin: 0px 17px 0px 0px;
        @include media(wd) {
            font-size: 13px;
            line-height: 15px;
        }
        @include media(md) {
            padding: 2px 10px 2px 0px;
            font-size: 11px;
            margin: 0px 10px 10px 0px;
        }
        @include media(sm) {
            margin: 0px 0px 10px 12px;
        }
    }

    &__search {
        font-size: 14px;
        line-height: 16px;
        color: $color-grey-light;
        padding: 10px;
        @include media(wd) {
            font-size: 13px;
        }
        @include media(md) {
            font-size: 11px;
        }
        @include media(xs) {
            display: none;
        }

        &::placeholder {
            font-size: 14px;
            line-height: 16px;
            color: $color-grey-light;
            @include media(wd) {
                font-size: 13px;
            }
            @include media(md) {
                font-size: 11px;
            }
        }

    }

    &__input {
        margin: 0px 0px 0px 20px;
        position: absolute;
        right: 0;

        img {
            position: relative;
            top: 8px;
        }

        @include media(lg) {
            right: 0;
            top: -65px;
            z-index: 901;
        }

    }

}

.submenu .inner {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
</style>
