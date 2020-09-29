import Vue from "vue";
import store from "@/store/";
import config from "@/config/defaultSettings";

// 启动从store中读取回复数据
export default function Initializer() {
  console.log(`API_URL: ${process.env.VUE_APP_API_BASE_URL}`);

  store.commit("TOGGLE_DEVICE", Vue.ls.get("test", true));

  store.commit("TOGGLE_DEVICE", Vue.ls.get("test1", config.production));
}
