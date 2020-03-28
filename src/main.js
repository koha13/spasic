import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Vuelidate from "vuelidate";
import VuePlyr from "vue-plyr";
import Notifications from "vue-notification";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VuePlyr);
Vue.use(Notifications);
Vue.use(VueLazyload);

Vue.filter("minutes", value => {
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
  bind: function(el, binding, vnode) {
    el.eventSetDrag = function() {
      el.setAttribute("data-dragging", "yes");
    };
    el.eventClearDrag = function() {
      el.removeAttribute("data-dragging");
    };
    el.eventOnClick = function(event) {
      var dragging = el.getAttribute("data-dragging");
      // Check that the click was outside the el and its children, and wasn't a drag
      if (!(el == event.target || el.contains(event.target)) && !dragging) {
        // call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.addEventListener("touchstart", el.eventClearDrag);
    document.addEventListener("touchmove", el.eventSetDrag);
    document.addEventListener("click", el.eventOnClick);
    document.addEventListener("touchend", el.eventOnClick);
  },
  unbind: function(el) {
    document.removeEventListener("touchstart", el.eventClearDrag);
    document.removeEventListener("touchmove", el.eventSetDrag);
    document.removeEventListener("click", el.eventOnClick);
    document.removeEventListener("touchend", el.eventOnClick);
    el.removeAttribute("data-dragging");
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
