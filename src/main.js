import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/element.js";
import VueSocketIO from "vue-socket.io";

import SocketIO from "socket.io-client";
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("ws://127.0.0.1:4000"),
  })
);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
