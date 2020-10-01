import Vue from "vue";
import Vuex from "vuex";

import wechat from "./modules/wechat";
// import user from "./modules/user";

import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    wechat
  },
  state: {},
  mutations: {},
  actions: {},
  getters
});
