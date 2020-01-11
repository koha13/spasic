import axios from "axios";

const playlists = axios.create({
  baseURL: process.env.VUE_APP_BASE_API + "/playlist",
  timeout: 5000
});

export default playlists;
