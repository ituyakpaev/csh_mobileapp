<template>
    <div id="breadcrumbs" class="">
        <router-link tag="div" class="breadcrumbs-item" to="/">
            Главная
        </router-link>
        <router-link tag="div" v-for='item in path' class="breadcrumbs-item" :to="item.link" :key="item.link">
            {{ item.title }}
        </router-link>
    </div>
</template>

<script>

    export default {
        name: "breadcrumbs",
        props: {
            path: {
                type: Array,
                required: true
            }
        },
        data () {
            return {

            }
        },
        created() {
            console.log(this.path)
        }
    }
</script>

<style lang="scss">
    .breadcrumbs {
        width: 100%;

        &-item {
            font-size: 12px;
            color: $color-grey-light;
            font-weight: 300;
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;

            &:not(:last-child):after {
                content: "";
                display: inline-block;
                vertical-align: middle;
                height: 7px;
                width: 4px;
                background: url(../../assets/svg/ico_breadcrumb.svg) no-repeat 50% 50%;
                background-size: contain;
                margin: 0 10px;
            }

            &:last-child {
                // active page
            }
        }
    }
</style>
