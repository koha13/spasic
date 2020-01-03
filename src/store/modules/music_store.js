import songs from "@/axios/songs";

const state = {
  allSongs: Array,
  currentSong: Object,
  currentList: Array,
  volume: 1
};
const mutations = {
  updateAllSongs(state, data) {
    state.allSongs = data;
  }
};
const actions = {
  fetchAllSong({ commit }) {
    songs
      .get("", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res.data);
        commit("updateAllSongs", res.data);
      });
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
};
