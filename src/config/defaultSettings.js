// 全局默认设置
export default {
  production: process.env.NODE_ENV === "production",
  // vue-ls options
  storageOptions: {
    namespace:
      (process.env.VUE_APP_STORAGE_NAMESPACE
        ? process.env.VUE_APP_STORAGE_NAMESPACE
        : "default") + "__", // key prefix
    // namespace: "pro__", // key prefix
    name: "ls", // name variable Vue.[ls] or this.[$ls],
    storage: "local" // storage name session, local, memory
  }
};
