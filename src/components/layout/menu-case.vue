<template lang="pug">

    .lk-menu__case
        menu-item(:item="item")

        slide-up-down.lk-menu__sub(:active="open", v-if="item.nav && item.nav.length")
            menu-item(v-for="(sub, index) in nav", :item="sub", :key="index", :parent="item")

</template>

<script>

    import MenuItem from './menu-item'

    export default {

        name: 'menu-case',

        props: ['item'],

        components: {
            MenuItem
        },

        data(){
            return {

            }
        },

        computed: {
            open(){
                return this.$route.meta.section === this.item.name;
            },

            submenu(){
                return this.item.submenu.filter( item => !item.hideOnGlobal );
            }
        },

        methods: {

        },

        watch: {

        },
    }
</script>

<style scoped lang="scss">
    .lk-menu{

        &__case{
            margin: 0 -20px;
        }

    }
</style>
