<template lang="pug">
    link-item.lk-menu__item(
        :disabled="item.disabled",
        :href='item.href',
        :target='item.new_tab ? "_target" : "_self"',
        :class='{ is_active: item.href === $route.path }',
        @click.native="setActiveNav(item.href, !!item.new_tab)")
        .lk-menu__item-icon(v-if="item.nav && item.nav.length")
            icon(:name="open ? 'chevron-down' : 'chevron-right'", width="20")
        .lk-menu__item-icon(v-else-if="item.icon")
            icon(:name="item.icon", width="20")
        .lk-menu__item-name {{ item.title }}
        .lk-menu__item-count(v-if="item.count") {{ item.count | roundCounter }}


</template>

<script>

    export default {

        name: 'menu-item',

        props: ['item', 'parent'],

        data(){
            return {
            }
        },

        computed: {
            open(){
                return this.$route.meta.section === this.item.name;
            },

            active(){
                return this.$route.path.indexOf(this.item.route) === 0
            }
        },


        methods:{
            setActiveNav(route, new_tab = false){
                if (new_tab) {
                    window.open(route)
                } else {
                    this.$router.push(route)
                }
                this.$store.commit('base/SET_ACTIVE_NAV', route);
            }
        }

    }
</script>

<style scoped lang="scss">
    .lk-menu{


        &__item{
            position: relative;
            font-size: 14px;
            font-weight: 500;
            padding: 7px 20px 7px 40px;
            display: flex;
            cursor: pointer;
            justify-content: space-between;
            user-select: none;

            &:hover,
            &.is_active{
                background: rgba($color-yellow, 0.1);
                .lk-menu__item-icon{
                    color: $color-yellow;
                }
            }

            &_disabled{
                cursor: default;
                background: transparent!important;
                color: $color-grey-light;
                .lk-menu__item-icon{
                    color: lighten($color-grey-light, 20%) !important;
                }
            }

            &-name{
                /*white-space: nowrap;*/
                /*text-overflow: ellipsis;*/
                /*overflow: hidden;*/
                max-width: calc(100% - 50px);
            }

            &-icon{
                position: absolute;
                top: 7px;
                left: 15px;
                color: lighten($color-grey-light, 20%);
            }

            &-count{
                font-size: 12px;
                color: #fff;
                background: $color-yellow;
                border-radius: 20px;
                padding: 0 7px;
                line-height: 20px;
                height: 20px;
                box-sizing: border-box;
                min-width: 20px;
                text-align: center;
            }
        }
    }
</style>
