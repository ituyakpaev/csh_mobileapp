<template>
    <div class="inner content">
        <panel_box inner-class="curator">
            <checkbox label="Только активные группы" v-model="active_only" />
            <table_box v-bind="{...$data, data: filtered }" @open="open($event)" />
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
                active_only: false,
                isLoading: true,
                errorLog: [],
                headers: {
                    name: {
                        title: 'Название'
                    },
                    group_id: {
                        title: 'ID группы'
                    },
                    course_id: {
                        title: 'ID курса'
                    }
                },
                data: [],
                meta: {}
            }
        },
        computed: {
            filtered() {
                if (this.active_only) {
                    return this.data.filter(r => r.active === 'Y')
                } else {
                    return this.data
                }
            }
        },
        methods: {
            getData: async function () {
                this.isLoading = true

                await homeworks_curator.getGroups()
                    .then(res => {
                        this.data = res.data
                        this.meta = {
                            count: res.data.length,
                            limit: res.data.length,
                            skip: 0
                        }
                    })
                    .catch(err => {
                        this.errorLog.push(err)
                    })

                this.isLoading = false
            },
            open(row) {
                console.log(row)
                this.$router.push(`/curator/groups/${ row.group_id }`)
            }
        },
        created() {
            this.getData()
        }
    }
</script>
