import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

const ENV = process.env.NODE_ENV;
const LOCAL = ENV === 'test' || ENV === 'development';

Vue.use(Router);

const router = new Router({
    base: process.env.VUE_APP_MOBILE ? undefined : LOCAL ? '/testing/' : '/lk/', //isLocal || isDev ? '/' : '/lk/'
    mode: process.env.VUE_APP_MOBILE ? 'hash' : 'history', // isLocal || isDev ? 'hash' : 'history'
    root: process.env.VUE_APP_MOBILE ? '.' : '/',
    routes,
    linkActiveClass: 'is-active',
    linkExactActiveClass: 'is-active',
    transitionOnLoad: true
})

router.afterEach((to, from) => {
    document.title = to.meta.title;
    window.scrollTo(0, 0);
});

export default router
