import axios from "axios";
import router from "@/router/index.js";

const baseURL = process.env.VUE_APP_BASE_API;

const defaultAxios = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

defaultAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      window.localStorage.removeItem("token");
      router.replace("/login");
    }
    return Promise.reject(error);
  }
);
defaultAxios.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

const auth = axios.create({
  baseURL: baseURL + "/auth",
  timeout: 5000,
});

const songs = axios.create({
  baseURL: baseURL + "/songs",
  timeout: 5000,
});

songs.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      window.localStorage.removeItem("token");
      router.replace("/login");
    }
    return Promise.reject(error);
  }
);

songs.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

const playlists = axios.create({
  baseURL: baseURL + "/playlists",
  timeout: 5000,
});
playlists.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      window.localStorage.removeItem("token");
      router.replace("/login");
    }
    return Promise.reject(error);
  }
);

playlists.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
});

export default defaultAxios;
export { auth, songs, playlists };
