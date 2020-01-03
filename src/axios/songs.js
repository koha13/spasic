import axios from "axios";

const songs = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + "/songs",
  timeout: 5000
});

export default songs;
