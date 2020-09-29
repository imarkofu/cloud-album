const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const assetsCDN = {
  // webpack build externals
  externals: {
    // vue: "Vue",
    // "vue-router": "VueRouter",
    // vuex: "Vuex",
    // axios: "axios"
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    // "//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    // "//cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js",
    // "//cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js",
    // "//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js"
  ]
};

// vue.config.js
const vueConfig = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod, add externals
    externals: IS_PROD ? assetsCDN.externals : {}
  },

  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      });

    // if prod is on
    // assets require on cdn
    if (IS_PROD) {
      config.plugin("html").tap(args => {
        args[0].cdn = assetsCDN;
        return args;
      });
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ["*"]
          })
        ]
      }
    }
  },

  // devServer: {
  //   // proxy: {
  //   //   "/api": {
  //   //     target: "http://localhost:8080"
  //   //   }
  //   // }
  //   // development server port 8000
  //   // port: 8000
  //   // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
  //   // proxy: {
  //   //   '/api': {
  //   //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
  //   //     ws: false,
  //   //     changeOrigin: true
  //   //   }
  //   // }
  // },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
};

