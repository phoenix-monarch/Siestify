import Vue from "vue";
import VueCompositionApi, { createApp, h } from "@vue/composition-api";
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import VueLazyload from "vue-lazyload";
import { Plugin } from "vue-fragment";
import {
  uniTrash,
  uniListOlAlt,
  uniBookMedical,
  uniEstate,
  uniAngleDown,
  uniAngleUp,
  uniAngleLeft,
  uniAngleRight,
  uniStepBackward,
  uniSkipForward,
  uniPlay,
  uniPause,
  uniRepeat,
  uniArrowRandom,
  uniVolumeUp,
  uniVolumeMute,
  uniVolumeDown,
  uniVolume,
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
  uniTrash,
  uniListOlAlt,
  uniBookMedical,
  uniEstate,
  uniAngleDown,
  uniStepBackward,
  uniSkipForward,
  uniAngleUp,
  uniPlay,
  uniPause,
  uniArrowRandom,
  uniRepeat,
  uniVolumeMute,
  uniVolumeUp,
  uniVolumeDown,
  uniVolume,
  uniAngleLeft,
  uniAngleRight,
  uniMinus,
  uniSquareFull,
  uniTimes,
  uniMusic,
  uniApps,
  uniStar,
]);

const loadImage = require("./assets/loading.gif");
const errorImage = require("./assets/error.png");

Vue.use(Plugin);
Vue.use(Unicon);
Vue.use(VueCompositionApi);
Vue.use(VueLazyload, {
  error: errorImage,
  loading: loadImage,
});

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

createApp({
  render: () => h(App),
  router,
  store,
}).mount("#app");
