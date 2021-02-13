<template>
    <div class="table__footer">
        <div class="table__footer-numeric" v-if="meta.count">
            {{ meta.skip }}-{{ meta.limit + meta.skip > meta.count ? meta.count : meta.limit + meta.skip }} из {{ meta.count }}
        </div>
        <div class="table__pagination" v-if="meta.count >= meta.limit">

            <div class="table__pagination-page" v-if="page - 2 > 1"  @click="paginate(1)">1</div>
            <div class="table__pagination-page" v-if="page - 2 > 1" >...</div>

            <div class="table__pagination-page" v-for="item in pages_show" :key='item' :class="{ active: item === page }"
                @click="paginate(item)">
                {{ item }}
            </div>

            <div class="table__pagination-page" v-if="page_max - page > 2" >...</div>
            <div class="table__pagination-page" v-if="page_max - page > 2" @click="paginate(page_max)">{{ page_max }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            meta: Object
        },
        computed: {
            page() {
                return ( this.meta.skip / this.meta.limit ) + 1
            },
            page_max() {
                return Math.ceil(this.meta.count / this.meta.limit)
            },
            pages_show() {
                let res = []
                if (this.page > 2) {
                    res = [ ( this.page - 2 ) ,( this.page - 1 ) ]
                } else if (this.page === 2) {
                    res = [ 1 ]
                }

                res = [ ...res, this.page ]

                if (this.page_max - this.page >= 2 ) {
                    res = [ ...res, this.page + 1, this.page + 2]
                } else if (this.page_max - this.page === 1) {
                    res = [ ...res, this.page + 1]
                }

                return res
            }
        },
        methods: {
            paginate(page) {
                console.log(page)
                let query = {
                    skip: (page - 1) * this.meta.limit,
                    limit: this.meta.limit
                }

                this.$emit('paginate', query)

            }
        },
    }
</script>
