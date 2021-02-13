import {base as Api} from '../../middleware/v1/api'

import { menu } from '../../components/layout/navigation';
import user from "@/middleware/v1/api/user";

import env from '../library/env';

let navCountBuffer = {
    courses: {},
    dialogs: {},
};

export default {
    namespaced: true,

    state: {
        auth_state: true, // deprecated

        session: {
            token: '',
            status: false
        },

        customTitle: null,

        websocket: null,

        showMenu: false,

        breakpoint: {
            mobile: false,
            tablet: false,
            compact: false,
            desktop: false,
            hd: false,
            current: ''
        },

        activeNav: null,

        user: {
            id: null,
            photo: '',
            name: '',
            email: '',
            curator: false,
            register_date: '',
        },

        sections: {
            dialogs: true,
            courses: true,
        },

        localNav: {
            courses: null,
            dialogs: null,
            notlesson: {
                breakpoints: null,
                rows: [
                    {
                        to: '#lesson-description',
                        fullPath: true,
                        title: 'Описание',
                        tag: 'a'
                    },
                    {
                        to: '#lesson-detail',
                        fullPath: true,
                        title: 'Детали',
                        tag: 'a'
                    },
                    {
                        to: { hash: '#lesson-notes'},
                        fullPath: true,
                        title: 'Примечание',
                        tag: 'a'
                    },
                ]
            },
            settings: {
                breakpoints: ['compact', 'tablet', 'small', 'mobile'],
                rows: [
                    {
                        to: '/settings/profile',
                        fullPath: true,
                        title: 'Профиль',
                        tag: 'a'
                    },
                    {
                        to: '/settings/payment',
                        fullPath: true,
                        title: 'Оплаты',
                        tag: 'a'
                    }
                ]
            }
        },

        gallery: {
            items: [],
            open: null
        },

        cards: {
            loaded: false,
            rows: []
        }
    },

    mutations: {
        SET_CUSTOMTITLE(state, value) {
            state.customTitle = value
            document.title = value
        },

        SET_SESSION(state, { token, status }) {
            state.session.token = token
            state.session.status = status
        },

        SET_AUTHSTATE(state, value) { //deprecated
            state.auth_state = !!(value)
            if (!value) {
                //location = 'https://alinamakarova.ru'
            }
        },

        TOGGLE_MENU(state, value){
            state.showMenu = value !== undefined ? !!value : !state.showMenu;
        },

        SET_WEBSOCKET(state, value){
            state.websocket = value;
        },

        SET_GALLERY(state, {gallery, open}){
            state.gallery.items = gallery;
            state.gallery.open = open;
        },

        SET_GALLERY_OPEN(state, open){
            state.gallery.open = open;
        },

        SET_USER(state, user) {
            state.user = {
                ...state.user,
                ...user
            }
        },

        SET_COMMON_INFO(state, {user, sections}){
            //state.user = user;
            state.sections = Object.assign({}, state.sections, sections || {});
        },

        SET_ACTIVE_NAV(state, id){
            state.activeNav = id || null;
        },

        SET_MENU(state, value){

            let nav = [...navigation];

            Object.keys(value).forEach( name => {
                let idx = nav.findIndex( i => i.name === name );

                if ( idx >= 0 && nav[idx] ){
                    let count = 0;
                    const submenu = value[name].map( item => {
                        if (item.count) count += item.count;
                        return {
                            key_id: item.id,
                            title: item.title,
                            count: item.count,
                            route: `${nav[idx].route}/${item.id}`,
                        }
                    });

                    nav[idx].submenu = [...nav[idx].submenu, ...submenu];

                    nav[idx].count = count;
                }
            });

        },

        SET_VIEWPORT(state, bp){
            Object.keys(state.breakpoint).map((key)=>{
                state.breakpoint[key] = key === bp;
            });
            state.breakpoint.current = bp;
        },

        SET_LOCAL_NAV(state, value){
            if ( value && value.menu ) {
                state.localNav[value.section] = {
                    rows: []
                }
                state.localNav[value.section].rows = value.menu.map(item => {
                    if ( !item.count && navCountBuffer[value.section][item.id.toString()] ) {
                        item.count = navCountBuffer[value.section][item.id];
                    }
                    navCountBuffer[value.section] = {};
                    return item;
                });
            }
        },

        SET_LOCAL_NAV_COUNT(state, {name, id, count}){
            if ( state.localNav[name] && state.localNav[name].length ){
                const idx = state.localNav[name].findIndex( item => item.id.toString() === id.toString());
                if (idx >= 0) state.localNav[name][idx].count = count;
            } else {
                navCountBuffer[name][id.toString()] = count;
            }
        },

        SET_CARDS(state, { rows }) {
            if (rows) {
                state.cards.rows = rows
                state.cards.loaded = true
            }
        }

    },

    actions: {

        getMenu(context){
            return Api.getMenu()
                .then((res)=>{
                    context.commit('SET_MENU', res);
                })
                ;
        },

        commonInfo(context){
            return Api.commonInfo()
                .then((res)=>{
                    context.commit('SET_COMMON_INFO', res);
                })
                ;
        },

        exit() {
            console.log(env)
            localStorage.removeItem('session_id')
            if (env.isProd) {
                window.location.href = "https://alinamakarova.ru?logout=yes"
            }
        },

        getCookies() {
            console.log('getting cookies')
            user.getCookies()
                .then(res => {
                    console.log(res)
                })
        },

        initSocials() {
            document.addEventListener("DOMContentLoaded", function () {
                window.fbAsyncInit = function() {
                    window.FB.init({
                        appId: 398206061505133,
                        autoLogAppEvents: true,
                        xfbml: true,
                        version: 'v9.0'
                    });
                }
                window.VK.init({
                    apiId: 7716381
                })
            })
        }
    },

    getters: {
        navigation({ user }) {
            return menu.filter(group => {
                if (group.curator === true) {
                    return user.is_curator
                } else {
                    return true
                }
            })
        }
    }
}
