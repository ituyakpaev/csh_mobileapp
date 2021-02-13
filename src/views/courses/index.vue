<template lang="pug">
    .inner
        .content
            .course-card
                .loader(v-if="loading")
                course-card(v-for="card in list", :key="card.id", :item="card")
</template>

<script>

    import {mapState} from "vuex";
    import CourseCard from './course-card';
    import Breadcrumbs from "../../components/layout/breadcrumbs";

    //breadcrumbs(:path="[{ title: 'Курсы', link: '/courses'}]")

    export default {

        components: {
            Breadcrumbs,
            CourseCard
        },

        data(){
            return {
                loading: false
            }
        },

        computed: {
            ...mapState({
                list: state => state.course.list,
            }),
        },

        methods: {
            loadData: async function (){
                this.loading = true;
                this.$store.dispatch('course/getLocalNav');
                await this.$store.dispatch('course/getList')
                    .then(res => {
                        console.log(res)
                        /*if ( res.items.length === 1 ){
                            this.$router.push(`/courses/${res.items[0].id}`)
                        } else if ( this.$route.name !== 'courses-all' ) {
                            this.$router.push(`/courses/all`)
                        }*/
                    })
                    .finally(err => {
                        console.log(err)
                    });

                this.loading = false
            }
        },

        created(){
            this.loadData();
        },
    }
</script>

<style scoped>
    .course-card{
        margin: -10px;
        display: flex;
        flex-wrap: wrap;


    }
</style>
