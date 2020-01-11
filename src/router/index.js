import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Songs from "../views/Songs.vue";
import Login from "../views/Login.vue";
import Playlists from "../views/Playlists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/songs",
    name: "songs",
    component: Songs
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/playlists",
    name: "playlists",
    component: Playlists
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
