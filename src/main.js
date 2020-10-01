import "amfe-flexible";

// with polyfills
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import "./mock";

import bootstrap from "./core/bootstrap";
import "./core/lazy_use";
import "./permission";
import "./utils/filter"; // global filter

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount("#app");
