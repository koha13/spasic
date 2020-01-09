import songs from "@/axios/songs";

const state = {
  allSongs: Array,
  currentSong: Object,
  currentList: [],
  volume: 1,
  player: Object,
  isPlaying: false
};
const mutations = {
  updateAllSongs(state, data) {
    state.allSongs = data;
  },
  updateCurrentList(state, value) {
    state.currentList = value;
  },
  updateCurrentSong(state, song) {
    state.currentSong = song;
  },
  updateSourcePlayer(state) {
    state.player.source = {
      type: "audio",
      sources: [
        {
          src: state.currentSong.link,
          type: "audio/ogg"
        }
      ]
    };
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
        commit("updateAllSongs", res.data);
      });
  },
  play({ state }) {
    state.player.play();
    state.isPlaying = true;
  },
  pause({ state }) {
    state.player.pause();
    state.isPlaying = false;
  },
  playAllSong({ state, dispatch, commit }) {
    state.currentList = [...state.allSongs];
    commit("updateCurrentSong", state.currentList[0]);
    commit("updateSourcePlayer");
    dispatch("play");
  },
  playSong({ state, dispatch, commit }, song) {
    if (song.id == state.currentSong.id && state.isPlaying == true) {
      dispatch("pause");
    } else if (song.id == state.currentSong.id && state.isPlaying == false) {
      dispatch("play");
    } else {
      commit("updateCurrentSong", song);
      commit("updateSourcePlayer");
      let check = 0;
      if (state.currentList.length > 0) {
        for (let i = 0; i < state.currentList.length; i++) {
          if (state.currentList[i].id == song.id) {
            check = 1;
            break;
          }
        }
      }

      if (check == 0) state.currentList = state.currentList.concat(song);

      dispatch("play");
    }
  },
  nextSong({ state, dispatch, commit }) {
    if (state.currentList.length > 0) {
      let check = -1;
      for (let i = 0; i < state.currentList.length; i++) {
        if (state.currentList[i].id == state.currentSong.id) {
          check = i;
          break;
        }
      }
      if (check != -1) {
        if (check < state.currentList.length - 1) {
          commit("updateCurrentSong", state.currentList[check + 1]);
        } else if (check == state.currentList.length - 1) {
          commit("updateCurrentSong", state.currentList[0]);
        }
        commit("updateSourcePlayer");
        dispatch("play");
      }
    }
  },
  backSong({ state, dispatch, commit }) {
    if (state.currentList.length > 0) {
      let check = -1;
      for (let i = 0; i < state.currentList.length; i++) {
        if (state.currentList[i].id == state.currentSong.id) {
          check = i;
          break;
        }
      }
      if (check != -1) {
        if (check > 0) {
          commit("updateCurrentSong", state.currentList[check - 1]);
        } else if (check == 0) {
          commit(
            "updateCurrentSong",
            state.currentList[state.currentList.length - 1]
          );
        }
        commit("updateSourcePlayer");
        dispatch("play");
      }
    }
  }
};
const getters = {
  isPlaying: state => {
    return state.isPlaying;
  },
  currentSong: state => {
    return state.currentSong;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
