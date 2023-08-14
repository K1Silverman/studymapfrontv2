"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("vue");
require("./style.css");
var App_vue_1 = require("./App.vue");
var index_ts_1 = require("./router/index.ts");
console.log(App_vue_1.default);
Vue.createApp(App_vue_1.default).use(index_ts_1.default).mount('#app');
