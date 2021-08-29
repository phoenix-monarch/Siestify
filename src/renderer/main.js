import Vue from "vue";
import axios from "axios";
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import {
  uniEstate,
  uniAngleDown,
  uniAngleUp,
  uniAngleLeft,
  uniAngleRight,
  uniStepBackward,
  uniSkipForward,
  uniPlay,
  uniRepeat,
  uniArrowRandom,
  uniVolumeUp,
  uniVolumeMute,
  uniMinus,
  uniSquareFull,
  uniTimes,
  uniMusic,
  uniApps,
  uniStar,
} from "vue-unicons/dist/icons";

import App from "./App";
import router from "./router";
import store from "./store";

Unicon.add([
  uniEstate,
  uniAngleDown,
  uniStepBackward,
  uniSkipForward,
  uniAngleUp,
  uniPlay,
  uniArrowRandom,
  uniRepeat,
  uniVolumeMute,
  uniVolumeUp,
  uniAngleLeft,
  uniAngleRight,
  uniMinus,
  uniSquareFull,
  uniTimes,
  uniMusic,
  uniApps,
  uniStar,
]);

Vue.use(Unicon);

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
