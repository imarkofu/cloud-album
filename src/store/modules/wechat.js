import Vue from "vue";
import { auth, info } from "@/api/wechat";
import { ACCESS_TOKEN, WECHAT_OPEN_ID } from "@/store/mutation-types";

const wechat = {
  state: {
    token: "",
    wechatId: "",
    user: {},
    wechat: {},
    sp: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      Vue.ls.set(ACCESS_TOKEN, token);
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_WECHAT: (state, wechat) => {
      state.wechat = wechat;
    },
    SET_SP: (state, sp) => {
      state.sp = sp;
    }
  },
  actions: {
    Auth({ commit }, data) {
      return new Promise((resolve, reject) => {
        auth({ ...data })
          .then(res => {
            if (res) {
              if (res.code === 0) {
                commit("SET_TOKEN", res.result.token);
                resolve(res);
              } else {
                reject(res);
              }
            } else {
              reject();
            }
          })
          .catch(err => reject(err));
      });
    },
    Info({ commit }) {
      return new Promise((resolve, reject) => {
        info()
          .then(res => {
            if (res) {
              if (res.code == 0) {
                commit("SET_USER", res.result.user);
                commit("SET_WECHAT", res.result.wechat);
                if (res.result.sp) {
                  // 可能没有
                  commit("SET_SP", res.result.sp);
                }
                resolve(res);
              } else {
                reject(res);
              }
            } else {
              reject();
            }
          })
          .catch(err => reject(err));
      });
    }
  }
};

export default wechat;
