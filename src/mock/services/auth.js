import Mock from "mockjs2";
import { builder, getQueryParameters } from "../util";

const username = ["admin", "super"];
// 强硬要求 ant.design 相同密码
// '21232f297a57a5a743894a0e4a801fc3',
const password = [
  "235c5222adf538874f108e92547fe9cd",
  "50d3125258ce67db35179a583f2b0404"
]; // admin, ant.design

const login = options => {
  const body = getQueryParameters(options);
  console.log(body);
  if (!username.includes(body.username) || !password.includes(body.password)) {
    return builder({ isLogin: true }, "账户或密码错误", 401);
  }
  // if (!username.includes("admin") || !password.includes("235c5222adf538874f108e92547fe9cd")) {
  //   return builder({ isLogin: true }, "账户或密码错误", 401);
  // }

  return builder({ token: "4291d7da9005377ec9aec4a71ea837f" }, "");
};

const logout = () => {
  return builder({}, "[测试接口] 注销成功");
};

Mock.mock(/\/api\/auth\/login/, "post", login);
Mock.mock(/\/api\/auth\/logout/, "post", logout);
