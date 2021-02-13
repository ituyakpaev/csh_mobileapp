import './assets/css/style.scss'

import Vue from 'vue';

Vue.prototype.$domain = 'https://alinamakarova.ru'
Vue.prototype.basePath = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? '/testing/' : '/lk/'
Vue.prototype.$env = 'prod'
Vue.config.devtools = true;

import {
  router,
  store,
  filters,
  library
} from './plugins'

Object.keys(filters).forEach(name => {
  Vue.filter(name, filters[name]);
});

Object.keys(library).forEach(name => {
  Vue.use(library[name].plugin, library[name].options || {});
});

import aos from "./plugins/aos";
aos()

import * as components from './components';

Object.keys(components).forEach(name => {
  Vue.component(name, components[name]);
});

Vue.component('button_box',() => import('./components/form/button_box'))
Vue.component('input_box',() => import('./components/form/input_box'))
Vue.component('checkbox', () => import('./components/form/checkbox'))

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
Vue.use(VueAwesomeSwiper)

import App from './App.vue';

const renderApp = () => {
  if ( document.getElementById('app') ){
    window.app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    });
  }
};

if (process.env.VUE_APP_MOBILE) {
  document.addEventListener("deviceready", renderApp, false);
} else {
  renderApp();
}
