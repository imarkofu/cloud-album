const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const plugins = [];
if (IS_PROD) {
  plugins.push("transform-remove-console");
}

plugins.push([
  "import",
  { libraryName: "vant", libraryDirectory: "es", style: true },
  "vant"
]);

module.exports = {
  presets: [
    "@vue/cli-plugin-babel/preset",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3
      }
    ]
  ],
  plugins
};
