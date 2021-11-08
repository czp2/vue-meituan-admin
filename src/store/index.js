import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import login from "./login"
import auth from "./auth"

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { login, auth }
})
