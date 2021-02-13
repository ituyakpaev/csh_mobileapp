<template>
    <div class="inner-wide content">
        <div class="h1" v-if="$route.query.q">
            Поиск по запросу: <span class="c-yellow" v-text="$route.query.q"/>
        </div>
        <payment_required :state="payment_required"/>
        <div class="baza">
            <card
                class="baza__card"
                v-for="article in rows"
                :article="article"
                :key="article.id"
            />
            <div
                class="baza__to-top"
                :style="{ backgroundImage: `url(${basePath}/svg/up-arrow.svg)` }"
            ></div>
        </div>
        <IntersectionRoot>
            <intersection-child @enter="qwe('enter')" @leave="qwe('leave')"/>
        </IntersectionRoot>
    </div>
</template>

<script>
import baza from "@/middleware/v1/api/baza";
import payment_required from "@/views/baza/payment_required";
import {IntersectionRoot, IntersectionChild} from "vue-intersection";
import card from "@/views/baza/card";

export default {
    name: "index.vue",
    components: {card, IntersectionRoot, IntersectionChild, payment_required},
    data() {
        return {
            isLoading: true,
            isPerforming: false,
            payment_required: false,
            errorLog: [],
            rows: [],
            meta: {},
        };
    },
    methods: {
        scroll() {
            window.addEventListener("scroll", function () {
                let bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight ===
                    document.documentElement.offsetHeight;

                if (bottomOfWindow) {
                    console.log("biiiiiittt");
                }
            });
        },
        getData: async function () {
            this.isLoading = true;

            await baza.getArticles({limit: 20, ...this.$route.query})
                .then((res) => {
                    this.rows = res.data.rows;
                    this.meta = res.data.meta;
                })
                .catch((err) => {
                    if (err.code === 402) {
                        this.payment_required = true;
                    } else {
                        this.errorLog.push(err);
                    }
                });

            this.isLoading = false;
        },
        qwe(e) {
            console.log(e);
        },
    },
    created() {
        this.getData();
        this.$store.dispatch("baza/getFavorites");
    },
    mounted() {
        this.scroll();
    },
};
</script>

<style lang="scss">
.baza {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    padding: 0 0 30px;

    &__to-top {
        display: none;

        @include media(sm) {
            background-repeat: no-repeat;
            background-size: 29px 30px;
            background-position: center center;
            display: block;
            width: 60px;
            height: 60px;
            position: fixed;
            right: 25px;
            bottom: 50px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.25);
        }
    }

    &__card {
        width: calc(20% - 20px);
        height: 400px;

        @include media(wd) {
            width: calc(25% - 20px);
        }
        @include media(lg) {
            width: calc(33.333% - 20px);
        }
        @include media(md) {
        }
        @include media(sm) {
            width: calc(50% - 20px);
        }
        @include media(xs) {
            width: 100%;
            height: 365px;
        }
    }
}
</style>
