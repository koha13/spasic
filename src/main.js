import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;
Vue.use(Vuelidate);

Vue.filter("minutes", value => {
  if (!value || typeof value !== "number") return "00:00";
  let min = parseInt(value / 60),
    sec = parseInt(value % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  value = min + ":" + sec;
  return value;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
