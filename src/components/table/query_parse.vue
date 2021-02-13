<template>
    <div class="table-query">
        <div v-for="(q, key) in query_parsed" :key="key" class="table-query__item">
            {{ q.title }}
            {{ q.value }}
            <div class="table-query__item-close" @click="cancel_query(key)">
                <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true">
                    <path d="M11.414 10l4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "query_parse",
        props: ['query'],
        inject: [
            'query_parse'
        ],
        computed: {
            query_parsed() {
                let result = {}
                Object.keys(this.query_parse).map(key => {
                    if (typeof this.query[key] !== 'undefined' && this.query[key] !== '') {
                        result[key] = {
                            title: this.query_parse[key],
                            value: decodeURI(this.query[key])
                        }
                    }
                })
                return result
            }
        },
        methods: {
            cancel_query(key) {
                let result = {}
                result[key] = ''

                this.$emit('cancel',  result)
            }
        }
    }
</script>
