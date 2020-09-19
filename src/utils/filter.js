import Vue from "vue";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

Vue.filter("yyyyMMddHHmmss", function(
  dataStr,
  pattern = "YYYY-MM-DD HH:mm:ss"
) {
  return moment(dataStr).format(pattern);
});

Vue.filter("yyyyMMdd", function(dataStr, pattern = "YYYY-MM-DD") {
  return moment(dataStr).format(pattern);
});
