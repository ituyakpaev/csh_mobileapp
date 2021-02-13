<template>
    <div class="lk-header">
        <div :class="innerClass">
            <div class="lk-header__top">
                <div class="lk-header__handler" v-ripple @click="$store.commit('base/TOGGLE_MENU')"
                     :class="{'lk-header__handler_active': showMenu}">
                    <div class="lk-header__handler-burger"/>
                </div>
                <div class="lk-header__title" >
                    {{ customTitle || $route.meta.title }}
                    <router-link v-if="$route.name === 'baza' || $route.name === 'baza_article' && this.$store.state.baza.favorites.loaded"
                                 class="baza__favorits" :to="{ name: 'baza', query: { favorite: true } }" />
                </div>
            </div>
        </div>
        <lk-nav v-if="showLocalNav" />
        <BazaNav v-else-if="$route.name === 'baza' || $route.name === 'baza_article'" />
    </div>
</template>

<script>
    import BazaNav from '../../views/baza/nav';
    import LkNav from './nav'
    import { mapState } from 'vuex'

    export default {
        name: "v_header",
        components: { BazaNav, LkNav },
        props: {
            showLocalNav: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            innerClass() {
                let route = this.$route.name
                let wide = route === 'lessons' || route === 'lesson' || route === 'baza' || route === 'baza_article'
                return wide ? 'inner-wide' : 'inner'
            },
            ...mapState({
                customTitle: state => state.base.customTitle,
                showMenu: state => state.base.showMenu
            }),
        }
    }
</script>
