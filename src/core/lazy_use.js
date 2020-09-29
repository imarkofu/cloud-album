import Vue from "vue";
import VueStorage from "vue-ls";
import config from "@/config/defaultSettings";

// base library
import "@/core/lazy_lib/components_use";

// ext library

Vue.use(VueStorage, config.storageOptions);
