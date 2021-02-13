<template>
    <router-link
        class="baza-card"
        :to="`/baza/${article.id}`"
        v-lazy:background-image="article.img"
    >
        <div class="baza-card__inner">
            <div class="baza-card__tag">
                <span>#</span>
                {{ rubric }}
            </div>
            <div class="baza-card__title h2" v-html="article.title"/>
            <div class="baza-card__wrap">
                <div class="baza-card__announce text" v-html="article.announce"/>
            </div>
            <div class="baza-card__btn">
                Читать
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: "card",
    props: {
        article: {
            required: true,
            type: Object,
        },
    },
    computed: {
        rubric() {
            let rubric = this.$store.state.baza.rubrics.rows.find(
                (r) => r.id === this.article.rubric
            );
            return rubric ? rubric.title : "";
        },
    },
};
</script>

<style lang="scss">
.baza-card {
    display: flex;
    flex-direction: column;
    filter: drop-shadow(2px 2px 15px rgba(0, 0, 0, 0.05));
    margin: 10px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    height: 400px;

    &__btn {
        font-size: 16px;
        line-height: 19px;
        color: $color-yellow;
        font-weight: 500;
        margin: 10px 0px 0px 0px;
        @include media(xs) {
            font-size: 15px;
            line-height: 18px;
        }
    }

    &__wrap {
        flex: 1 1 auto;
    }

    &__announce {
        font-size: 16px;
        line-height: 19px;
        color: $color-black;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow-y: hidden;
        // flex: 1 1 auto;
        margin: 0px 0px 10px 0px;
        @include media(xs) {
            font-size: 12px;
            line-height: 14px;
        }
    }

    &__title {
        font-size: 22px;
        line-height: 28px;
        color: $color-black;
        margin: 0px 0px 15px 0px;
        @include media(xs) {
            font-size: 18px;
            line-height: 23px;
            margin: 0px 0px 10px 0px;
        }
    }

    &__tag {
        font-size: 13px;
        line-height: 15px;
        color: $color-grey;
        margin: 0px 0px 5px 0px;

        span {
            color: $color-yellow;
        }

        @include media(xs) {
            font-size: 12px;
            line-height: 14px;
        }
    }

    &__inner {
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        min-height: 250px;
        margin-top: 100px;
        align-self: flex-end;
        background: linear-gradient(
                180.24deg,
                rgba(255, 255, 255, 0) 0.21%,
                rgba(255, 255, 255, 0.9) 48.84%
        );
        @include media(md) {
            min-height: 230px;
        }
        @include media(xs) {
            min-height: 280px;
            padding: 120px 12px 15px;
        }

        padding: 43px 30px 15px;
    }
}
</style>
