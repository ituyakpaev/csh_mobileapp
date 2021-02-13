<template >
    <div class="lk-nav" v-dragscroll :class="`localnav__${ this.$route.meta.section }`">
        <div class="inner lk-nav__inner">
            <div class="lk-nav__list">
                <router-link class="lk-nav__item"
                             v-for="(item, id) in localNavigation.rows"
                             :key="id"
                             :to="item.fullPath ? item.to : `/${$route.meta.section}/${item.id}`"
                             :tag="item.tag || 'div'">
                    <div class="lk-nav__item-inner">
                        <div class="lk-nav__link">
                            {{ item.title }}
                        </div>
                        <div class="lk-nav__count" v-if="parseInt(item.count) > 0">
                            {{ item.count | roundCounter }}
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from "vuex";

    export default {

        computed: {
            ...mapState({
                activeNav: state => state.base.activeNav,
                localNav: state => state.base.localNav,
                isCurator: state => state.base.user.curator,
            }),

            localNavigation(){
                return this.localNav[this.$route.meta.section];
            }

        },

        methods: {
            comparePath(id){
                const parent = `/${this.$route.meta.section}/${id}`;
                return this.$route.path.indexOf(parent) >= 0;
            }
        }

    }
</script>

<style scoped lang="scss">


    .lk-nav{
        overflow: hidden;
        font-size: 0;
        &__list{
            white-space: nowrap;
            display: flex;
        }

        &__item{
            padding-right: 30px;
            font-size: 14px;
            font-weight: 400;
            user-select: none;

            &-inner{
                box-sizing: border-box;
                padding-top: 3px;
                cursor: pointer;
                height: 35px;
                display: flex;
                border-bottom: 0 solid $color-yellow;
                transition: border .3s ease;
            }

            &.is-active{
                font-weight: 500;

                .lk-nav__item-inner{
                    border-bottom-width: 3px;
                }
            }

        }

        &__link{
        }

        &__count{
            font-size: 12px;
            color: #fff;
            background: black; //$color-yellow
            border-radius: 20px;
            padding: 0 7px;
            line-height: 20px;
            height: 20px;
            box-sizing: border-box;
            min-width: 20px;
            text-align: center;
            margin-left: 10px;
        }
    }

</style>
