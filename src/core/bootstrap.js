import Vue from "vue";
import store from "@/store/";
import config from "@/config/defaultSettings";
import { ACCESS_TOKEN } from "@/store/mutation-types";

// 启动从store中读取回复数据
export default function Initializer() {
  console.log(`API_URL: ${process.env.VUE_APP_API_BASE_URL}`);

  store.commit("SET_TOKEN", Vue.ls.get(ACCESS_TOKEN));

  // store.commit("SET_WECHAT_ID", Vue.ls.get(WECHAT_OPEN_ID));
}
