import Vue from "vue";
import router from "./router";
import store from "./store";

import NProgress from "nprogress";
import { setDocumentTitle, domTitle } from "@/utils/domUtil";
import { ACCESS_TOKEN } from "@/store/mutation-types";

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.query.shareToken) {
    // TODO 从分享链接打开待实现
    console.log("todo check share token ...");
    next();
  } else if (to.query.code && to.query.state) {
    // 从微信打开，重新鉴权并获取用户信息
    store
      .dispatch("Auth", { state: to.query.state, code: to.query.code })
      .then(() => {
        store.dispatch("Info").then(res => {
          console.log(res);
        });
      })
      .catch(err => {
        console.log(err);
      });
    next();
  } else if (Vue.ls.get(ACCESS_TOKEN)) {
    if (!store.getters.wechatId) {
      console.log("需要获取用户信息");
    }
    console.log("already login, check user info exist ...");
    next();
  } else {
    next();
  }

  console.log(from);
  console.log(to);
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
