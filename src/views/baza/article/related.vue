<template>
    <div class="baza-related">
        <div class="swiper-container" v-swiper:related="options" >
            <div class="swiper-wrapper">
                <card class="swiper-slide" v-for="article in rows" :key="article.id" :article="article" />
            </div>
        </div>
    </div>
</template>

<script>
    import baza from "@/middleware/v1/api/baza";
    import card from "@/views/baza/card";

    export default {
        name: "related",
        components: {
            card
        },
        props: {
            list_id: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        data() {
            return {
                isLoading: true,
                errorLog: [],
                rows: [],
                slider: {},
                options: {
                    slidesPerView: 4,
                }
            }
        },
        methods: {
            getData: async function () {
                this.isLoading = true

                let query = {}
                if (this.list_id.length > 0) {
                    query["list_id"] = this.list_id.join(',')
                } else {
                    query['limit'] = 8
                }
                await baza.getArticles(query)
                    .then(res => {
                        this.rows = res.data.rows
                    })
                    .catch(err => {
                        this.errorLog.push(err)
                    })

                this.isLoading = true
            }
        },
        created() {
            this.getData()
        }
    }
</script>
