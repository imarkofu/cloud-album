import { isIE } from "@/utils/util";

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (
  process.env.NODE_ENV !== "production" &&
  process.env.NODE_ENV !== "preview"
) {
  if (isIE()) {
    console.error(
      "ERROR: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV."
    );
  }

  console.log("mock mounting");
  const Mock = require("mockjs2");

  require("./services/wechat");
  require("./services/user");

  Mock.setup({
    timeout: 800 // setter delay time
  });
  console.log("mock mounted");
}
