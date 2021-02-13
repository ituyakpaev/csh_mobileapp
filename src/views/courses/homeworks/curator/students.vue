<template>
    <div class="inner content">
        <panel_box inner-class="curator">
            <div class="curator-filters">
                <div class="curator-filters__item" :class="{ active: $route.query.status === id }"
                     v-for="(filter,id) in quick_filters" :key="id"
                     @click="$router.push({ ...$route, query: { ...$route.query, skip: 0, status: id} })" >
                    {{ filter.title }}
                </div>
            </div>
            <table_box v-bind="$data" @open="open($event)" @query:update="paginate($event)" />
        </panel_box>
    </div>
</template>

<script>
import homeworks_curator from "@/middleware/v2/api/homeworks/homeworks_curator";
import table_box from '@/components/table'
import panel_box from "@/components/regular/panel_box";

export default {
    name: "index.vue",
    components: {panel_box, table_box },
    data() {
        return {
            isLoading: true,
            errorLog: [],
            quick_filters: {
                new: {
                    title: 'Не на проверке'
                },
                checking: {
                    title: 'Ожидают проверки'
                },
                filled: {
                    title: 'Проверены'
                }
            },
            headers: {
                name: {
                    title: 'Название'
                },
                email: {
                    title: 'Почта пользователя'
                },
                user_id: {
                    title: 'ID пользователя'
                }
            },
            data: [],
            meta: {}
        }
    },
    methods: {
        getData: async function () {
            this.isLoading = true

            await homeworks_curator.getHomeworks(this.$route.params.id, this.$route.query)
                .then(res => {
                    console.log(res)
                    this.data = res.data.rows
                    this.meta = res.data.meta
                })
                .catch(err => {
                    this.errorLog.push(err)
                })

            this.isLoading = false
        },
        open(row) {
            console.log(row)
            this.$router.push(`/curator/groups/${ this.$route.params.id }/${ row.id }`)
        },
        paginate(query) {

            this.$router.push({
                name: this.$route.name,
                query: {
                    ...this.$route.query,
                    ...query
                }
            })
        }
    },
    created() {
        this.getData()
    },
    watch: {
        '$route.fullPath': function () {
            this.getData()
        }
    }
}
</script>

<style lang="scss">
    .curator-filters {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        &__item {
            padding: 7px 10px;
            margin: 0 5px 10px 0;
            cursor: pointer;
            transition: background-color .2s;
            border-radius: 15px;
            border: 1px solid black;

            &:hover {
                background-color: $color-grey-white;
            }

            &.active {
                background-color: $color-yellow;
                color: white;
                border-color: white;
            }
        }
    }
</style>
