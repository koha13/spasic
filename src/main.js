import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Vuelidate from "vuelidate";
import VuePlyr from "vue-plyr";
import Notifications from "vue-notification";
import VueLazyload from "vue-lazyload";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VuePlyr);
Vue.use(Notifications);
Vue.use(VueLazyload);

// Configuration VueAnalytics
Vue.use(VueAnalytics, {
  id: "UA-165025730-1",
});

Vue.filter("minutes", (value) => {
  if (!value || typeof value !== "number") return "00:00";
  let hour = parseInt(value / 3600),
    min = parseInt((value % 3600) / 60),
    sec = parseInt((value % 3600) % 60);
  sec = sec < 10 ? "0" + sec : sec;
  if (hour > 0) {
    min = min < 10 ? "0" + min : min;
    value = hour + ":" + min + ":" + sec;
  } else {
    value = min + ":" + sec;
  }

  return value;
});

Vue.directive("click-outside", {
  bind: function(el, binding, vNode) {
    // Define Handler and cache it on the element
    const bubble = binding.modifiers.bubble;
    const handler = (e) => {
      // e.stopPropagation();
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;

    // add Event Listeners
    document.addEventListener("click", handler);
  },

  unbind: function(el, binding) {
    // Remove Event Listeners
    document.removeEventListener("click", el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
