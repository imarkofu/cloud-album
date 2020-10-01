import api from "./index";
import { axios } from "@/utils/request";

export function auth(parameter) {
  return axios({
    url: api.wechat.auth,
    method: "post",
    data: parameter
  });
}

export function info(parameter) {
  return axios({
    url: api.wechat.info,
    method: "get",
    data: parameter
  });
}
