import Mock from "mockjs2";
import { builder, getQueryParameters, getBody } from "../util";

const auth = options => {
  const body = getQueryParameters(options);
  console.log(body);
  return builder(
    {
      token: "4291d7da9005377ec9aec4a71ea837f",
      wechatId: "o_8dy53YX6tEUgu0KHcAKIYHWZJk"
    },
    ""
  );
};

Mock.mock(/\/api\/user\/info/, "post", auth);
