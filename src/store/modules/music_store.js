import songs from "@/axios/songs";

const state = {
  allSongs: Array,
  currentSong: Object,
  currentList: [],
  volume: localStorage.getItem("plyr").volume,
  player: Object,
  isPlaying: false,
  loop: 0,
  random: false,
  storeList: null
};
const mutations = {
  updateAllSongs(state, value) {
    state.allSongs = value;
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
  },
  changeLoop(state) {
    if (state.loop == 1) state.loop = 2;
    else if (state.loop == 2) state.loop = 0;
    else state.loop = 1;
  },
  addSongToCurrentList(state, { song, res }) {
    state.currentList.splice(res + 1, 0, song);
  },
  deleteSongFromCurrentList(state, check) {
    state.currentList.splice(check, 1);
  },
  changeRandom(state) {
    state.random = !state.random;
  },
  updateStoreList(state, value) {
    state.storeList = value;
  },
  shuffleCurrentList(state) {
    let a = [...state.currentList];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    state.currentList = a;
  },
  changeRandom(state) {
    state.random = !state.random;
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
  playCurrentList({ commit, dispatch }) {
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
  findCurrentSongIndex({ state }, song) {
    let checkSong = song;
    if (song == null) checkSong = state.currentSong;
    return new Promise((resolve, reject) => {
      if (state.currentList.length > 0) {
        let check = -1;
        for (let i = 0; i < state.currentList.length; i++) {
          if (state.currentList[i].id == checkSong.id) {
            check = i;
            resolve(check);
          }
        }
      }
      resolve(-1);
    });
  },
  nextSong({ state, dispatch, commit }) {
    dispatch("findCurrentSongIndex").then(check => {
      if (check != -1) {
        if (check < state.currentList.length - 1) {
          commit("updateCurrentSong", state.currentList[check + 1]);
        } else if (check == state.currentList.length - 1) {
          commit("updateCurrentSong", state.currentList[0]);
        }
        commit("updateSourcePlayer");
        dispatch("play");
      }
    });
  },
  backSong({ state, dispatch, commit }) {
    dispatch("findCurrentSongIndex").then(check => {
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
    });
  },
  onEnd({ state, dispatch }) {
    if (state.loop == 2) dispatch("nextSong");
    else if (state.loop == 1) {
      state.player.restart();
      dispatch("play");
    } else if (state.loop == 0) {
      if (
        state.currentSong.id !=
        state.currentList[state.currentList.lenght - 1].id
      )
        dispatch("nextSong");
    }
  },
  addToNextSong({ commit, dispatch }, song) {
    dispatch("findCurrentSongIndex", song).then(check => {
      if (check != -1) commit("deleteSongFromCurrentList", check);
    });
    dispatch("findCurrentSongIndex").then(res => {
      commit("addSongToCurrentList", { song, res });
    });
  },
  addToCurrentList({ state, commit, dispatch }, song) {
    dispatch("findCurrentSongIndex", song).then(check => {
      if (check == -1) {
        let res = state.currentList.length - 1;
        commit("addSongToCurrentList", { song, res });
      }
    });
  },
  addShuffle({ commit, dispatch }, value) {
    commit("updateCurrentList", [...value]);
    commit("updateStoreList", [...value]);
    commit("shuffleCurrentList");
    dispatch("playCurrentList");
  },
  changeShuffle({ state, commit }) {
    if (state.currentList.length > 0) {
      if (state.random == false) {
        commit("updateStoreList", [...state.currentList]);
        commit("shuffleCurrentList");
        commit("changeRandom");
      } else {
        commit("updateCurrentList", [...state.storeList]);
        commit("changeRandom");
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
  },
  loop: state => {
    return state.loop;
  },
  random: state => {
    return state.random;
  }
};
export default {
  state,
  mutations,
  actions,
  getters
};
