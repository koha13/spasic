import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Vuelidate from "vuelidate";
import VuePlyr from "vue-plyr";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VuePlyr);
Vue.use(Notifications);

Vue.filter("minutes", value => {
  if (!value || typeof value !== "number") return "00:00";
  let hour = parseInt(value / 3600),
    min = parseInt((value % 3600) / 60),
    sec = parseInt(value % 60);
  sec = sec < 10 ? "0" + sec : sec;
  if (hour > 0) {
    min = min < 10 ? "0" + min : min;
    value = hour + ":" + min + ":" + sec;
  } else {
    value = min + ":" + sec;
  }

  return value;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
