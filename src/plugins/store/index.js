
import Vue from 'vue'
import Vuex from 'vuex'
import base from './base'
import course from '../../views/courses/store'
import dialogs from "../../views/dialogs/store";
import baza from '../../views/baza/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    course,
    dialogs,
    baza
  }
})
