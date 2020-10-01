import Mock from "mockjs2";
import { builder, getQueryParameters, getBody } from "../util";

const auth = options => {
  const body = getBody(options);
  return builder({ token: "4291d7da9005377ec9aec4a71ea837f" }, "");
};

const info = options => {
  console.log(options);
  const body = getQueryParameters(options);
  console.log(body);
  const user = {
    id: "3bd18229b2ad4128b17f8ca5eaffcec8",
    number: "13310127782",
    numberId: "2333608dc64448d1b9b73afb678adf68",
    numberShow: "133****7782",
    type: 1,
    status: 1
  };
  const wechat = { openId: "o_8dy53YX6tEUgu0KHcAKIYHWZJk" };
  const sp = { id: 1, name: "测试", status: 1 };
  return builder({ user, wechat, sp }, "");
};

Mock.mock(/\/api\/wechat\/auth/, "post", auth);
Mock.mock(/\/api\/wechat\/info/, "get", info);
