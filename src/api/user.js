import api from "./index";
import { axios } from "@/utils/request";

export function auth(parameter) {
  return axios({
    url: api.user.info,
    method: "get",
    data: parameter
  });
}
