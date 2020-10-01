import Vue from "vue";
import axios from "axios";
import store from "@/store";
import { VueAxios } from "./axios";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import router from "@/router";
import qs from "qs";

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
});

const err = error => {
  if (error.request) {
    if (error.request.readyState === 4 && error.request.status === 0) {
      // 统一定义请求超时的返回内容
      return { code: 5, message: "网络不稳定请稍后再试" };
    }
  }
  if (error.response) {
    const data = error.response.data;
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      // notification.error({
      //   message: "Forbidden",
      //   description: data.message
      // });
      console.log("Forbidden");
    } else if (
      error.response.status === 401 &&
      !(data.result && data.result.isLogin)
    ) {
      // notification.error({
      //   message: "Unauthorized",
      //   description: "Authorization verification failed"
      // });
      console.log("Unauthorized");
      if (token) {
        store.dispatch("Logout").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  // return Promise.resolve(err);
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token) {
    config.headers["Access-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  console.log(config);
  if (config.method === "post") {
    config.data = qs.stringify(config.data, { indices: false });
  }
  return config;
}, err);

// response interceptor
service.interceptors.response.use(response => {
  console.log(response.data);
  if (!response.data.code && response.data.code !== 0) {
    // 没有code-文件下载
    return response;
  } else if (response.data.code === 1) {
    // notification.error({
    //   message: "无权访问",
    //   description: response.data.message || "您无权访问"
    // });
    console.log("无权访问");
    if (response.config.url === "/user/info") {
      setTimeout(() => {
        store.dispatch("Logout").then(() => {
          router.push({
            path: "/user/login",
            query: { redirect: router.app.$route.fullPath }
          });
        });
      }, 800);
    }
  } else if (response.data.code === 2) {
    // 自动登录
    if (
      store.state.app.autoLogin &&
      store.state.user.loginUsername &&
      store.state.user.loginPassword
    ) {
      store
        .dispatch("Login", {
          username: store.state.user.loginUsername,
          password: store.state.user.loginPassword
        })
        .then(res => {
          // 自动登录成功-自动重新加载页面
          // notification.open({
          //   message: "自动重登成功"
          // });
          console.log("自动登录成功");
          window.location.reload();
        })
        .catch(() => {
          // notification.error({
          //   message: "登录失效",
          //   description: response.data.message || "请重新登录"
          // });
          console.log("登录失效");
          store.dispatch("ToggleLoginUsername", "");
          store.dispatch("ToggleLoginPassword", "");
          setTimeout(() => {
            store.dispatch("Logout").then(() => {
              router.push({
                path: "/user/login",
                query: { redirect: router.app.$route.fullPath }
              });
            });
          }, 800);
        });
    } else {
      // notification.error({
      //   message: "登录失效",
      //   description: response.data.message || "请重新登录"
      // });
      console.log("登录失效");
      store.dispatch("ToggleLoginUsername", "");
      store.dispatch("ToggleLoginPassword", "");

      setTimeout(() => {
        store.dispatch("Logout").then(() => {
          router.push({
            path: "/user/login",
            query: { redirect: router.app.$route.fullPath }
          });
        });
      }, 800);
    }
  } else if (response.data.code === 4) {
    // notification.error({
    //   message: "404",
    //   description: response.data.message || "请求不存在"
    // });
    console.log("请求不存在");
  } else if (response.data.code === 5) {
    // notification.error({
    //   message: "500",
    //   description: response.data.message || "请求异常"
    // });
    console.log("请求异常");
  } else {
    return response.data;
  }
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
