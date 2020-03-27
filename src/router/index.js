import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Songs from "../views/Songs.vue";
import Login from "../views/Login.vue";
import Playlists from "../views/Playlists.vue";
import About from "../views/About.vue";
import Profile from "../views/Profile.vue";
import Loading from "../views/Loading.vue";
import AdminDashboard from "../views/AdminDashboard";

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
    component: About
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/loading",
    name: "loading",
    component: Loading
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminDashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
