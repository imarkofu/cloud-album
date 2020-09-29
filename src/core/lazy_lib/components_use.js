/* eslint-disable */
/**
 * 该文件是为了按需加载，剔除掉了一些不需要的框架组件。
 * 减少了编译支持库包大小
 *
 * 当需要更多组件依赖时，在该文件加入即可
 */

import Vue from 'vue'

import { Field, Toast, ActionSheet, Dialog, Overlay, ShareSheet, NoticeBar, Button, Icon } from 'vant'

Vue.use(Field)
Vue.use(Toast)
Vue.use(ActionSheet)
Vue.use(Dialog)
Vue.use(Overlay)
Vue.use(ShareSheet)
Vue.use(NoticeBar)
Vue.use(Button)
Vue.use(Icon)

 // 全局方法-将moment对象转换为字符串
Vue.prototype.parseQueryParams = function (params) {
    let pp = {};
    for (let key in params) {
      if (typeof params[key] === "object") {
        if (typeof(params[key].format) === 'function') {
          pp[key] = params[key].format("YYYY-MM-DD HH:mm:ss");
        } else {
          pp[key] = params[key].map(p => {
            return (typeof p === "object" && typeof p.format === "function") ? p.format("YYYY-MM-DD HH:mm:ss") : p;
            // return p.format("YYYY-MM-DD HH:mm:ss");
          });
        }
      } else {
        pp[key] = params[key];
      }
    }
    return pp;
  }