import Vue from "vue";
import Vuex from "vuex";
import user_store from "./modules/user_store";
import music_store from "./modules/music_store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user_store,
    music_store
  }
});
