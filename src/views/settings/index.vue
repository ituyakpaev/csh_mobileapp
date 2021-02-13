<template>
    <div class="inner settings">
        <div class="settings-menu" >
            <panel_box class="settings-menu__sticky" :padding="false">
                <div class="settings-menu__inner">
                    <h2 class="settings-menu__title h1">Настройки</h2>
                    <div class="settings-menu__list">
                        <router-link class="settings-menu__item" active-class="is-active"
                                     v-for="nav in nav" :key="nav.link" :to="nav.link" >
                            {{ nav.title }}
                        </router-link>
                    </div>
                </div>
            </panel_box>
        </div>
        <div class="settings-content">
            <router-view />
        </div>
    </div>
</template>

<script>
    import panel_box from "@/components/regular/panel_box";
    export default {
        name: "Profile",
        components: {panel_box},
        data () {
            return {
                isLoading: true,
                isError: false,
                nav: [
                    {
                        link: '/settings/profile',
                        title: 'Мои данные'
                    },
                    {
                        link: '/settings/payment',
                        title: 'Оплата, подписки'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
.settings {
    display: flex;
    justify-content: space-between;

    &__inner {
        @include breakPoint($breakpoint-compact){
            margin: 0 (-$grid-gutter / 2);
            display: flex;
        }
    }

    &-content{
			    width: 100%;
    			margin-left: 20px;
        margin-top: 20px;
        @include media(lg) {
						margin-left: 0px;
					  width: 100%;
            flex-direction: column;
				}
    }
}
.settings-menu {
    min-width: 322px;
    margin: 20px 0;

    @include media(lg) {
        display: none;
    }

    &__list{
        margin-top: 20px;
    }
    &__item{
        display: block;
        border-bottom: 2px solid rgba(255, 182, 0, 0.1);
        border-top: 2px solid rgba(255, 182, 0, 0.1);
        margin-top: -2px;
        padding: 20px 20px 20px 30px;
        color: $color-black;
        cursor: pointer;
        font-family: $font-main;
        font-size: 14px;
        font-weight: 400;

        &.is-active{
            background-color: rgba(255, 182, 0, 0.1);
        }

        &:hover:not(.is-active) {
            background-color: rgba(255, 182, 0, 0.03);
        }
    }
    &__title{
        padding: 25px 20px 0 30px;
    }

    &__inner {
        width: 100%;
    }
    &__sticky{
        position: fixed!important;
        width: 322px;
        background-color: #fff!important;
        bottom: 0;
        top: 85px;
    }
}
</style>
