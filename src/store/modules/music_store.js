import songs from "@/axios/songs";
import playlists from "@/axios/playlists";
import Vue from "vue";

const state = {
  allSongs: Array,
  currentSong: Object,
  currentList: [],
  player: Object,
  isPlaying: false,
  loop: 0,
  random: false,
  storeList: [],
  playlists: []
};
const mutations = {
  updateAllSongs(state, value) {
    state.allSongs = value;
  },
  updatePlaylists(state, value) {
    state.playlists = value;
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
  },
  deleteFromQueue(state, songId) {
    for (let i = 0; i < state.currentList.length; i++) {
      if (state.currentList[i].id == songId) {
        state.currentList.splice(i, 1);
        break;
      }
    }
    if (state.storeList.length > 0) {
      for (let i = 0; i < state.storeList.length; i++) {
        if (state.storeList[i].id == songId) {
          state.storeList.splice(i, 1);
          break;
        }
      }
    }
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
  },
  pause({ state }) {
    state.player.pause();
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

  /*Go forward current song */
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

  /*Back forward current song */
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

  /*Onend event when current song is end. Play next or loop or ... will be handle here */
  onEnd({ state, dispatch }) {
    if (state.loop == 2) dispatch("nextSong");
    else if (state.loop == 1) {
      state.player.restart();
      dispatch("play");
    } else if (state.loop == 0) {
      if (
        state.currentSong.id !==
        state.currentList[state.currentList.length - 1].id
      ) {
        dispatch("nextSong");
      } else {
        dispatch("pause");
      }
    }
  },

  /*Add a song next to current song. It will not add to store list
  So if current list is shuffled, you add a new song to it, then you unshuffle it, new song will be remove. */
  addToNextSong({ commit, dispatch }, song) {
    dispatch("findCurrentSongIndex", song).then(check => {
      if (check != -1) commit("deleteSongFromCurrentList", check);
    });
    dispatch("findCurrentSongIndex").then(res => {
      commit("addSongToCurrentList", { song, res });
      Vue.notify({
        group: "foo",
        title: song.name,
        text: "is added after current song",
        duration: 3000
      });
    });
  },

  /*Add a song to current list. It will not add to store list
  So if current list is shuffled, you add a new song to it, then you unshuffle it, new song will be remove. */
  addToCurrentList({ state, commit, dispatch }, song) {
    dispatch("findCurrentSongIndex", song).then(check => {
      if (check == -1) {
        let res = state.currentList.length - 1;
        commit("addSongToCurrentList", { song, res });
        Vue.notify({
          group: "foo",
          title: song.name,
          text: "is added to current list",
          duration: 3000
        });
      }
    });
  },

  /*Shuffle a list that come in value. Save it in store list,
  so if you dont want it's shuffled anymore, you can make it original again */
  addShuffle({ commit, dispatch }, value) {
    if (value.length > 0) {
      commit("updateCurrentList", [...value]);
      commit("updateStoreList", [...value]);
      commit("shuffleCurrentList");
      commit("changeRandom");
      dispatch("playCurrentList");
    }
  },

  /*Change shuffle state. If current list is shuffled, it will be back to its original. And vice versa */
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
  },

  /*Fetch all playlists from sv */
  fetchPlaylists({ commit }) {
    playlists
      .get("", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(res => {
        commit("updatePlaylists", res.data);
      });
  },

  /*Check all playlist if this song is in or not */
  checkSong({}, song) {
    return new Promise((resolve, reject) => {
      playlists
        .get("/checksong?idSong=" + song.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(res => {
          resolve(res.data);
        });
    });
  },

  /* Play playlist: param: id of playlist that need to play.
  Then search in state.playlists and play that pl */
  playPlaylist({ state, commit, dispatch }, idPl) {
    let i;
    for (i = 0; i < state.playlists.length; i++) {
      if (state.playlists[i].id == idPl) break;
    }
    if (state.playlists[i].songs.length > 0) {
      commit("updateCurrentList", [...state.playlists[i].songs]);
      commit("updateCurrentSong", state.currentList[0]);
      commit("updateSourcePlayer");
      dispatch("play");
    }
  },

  // Add to pl: payload:{song, playlistId}
  addSongToPl({ state, commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      playlists
        .post(
          "/" + payload.plId + "/song?idSong=" + payload.song.id,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          resolve(res.data);
          for (let i = 0; i < state.playlists.length; i++) {
            if (state.playlists[i].id == payload.plId) {
              state.playlists[i].songs.push(payload.song);
              Vue.notify({
                group: "foo",
                title: payload.song.name,
                text: "is added to: " + payload.plName,
                duration: 3000
              });
              break;
            }
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // delete song from pl: payload:{song, playlistId}
  deleteSongFromPl({ state }, payload) {
    return new Promise((resolve, reject) => {
      playlists
        .get("/" + payload.plId + "/deletesong?idSong=" + payload.song.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          resolve(res.data);
          for (let i = 0; i < state.playlists.length; i++) {
            if (state.playlists[i].id == payload.plId) {
              for (let j = 0; j < state.playlists[i].songs.length; j++) {
                if (payload.song.id == state.playlists[i].songs[j].id) {
                  state.playlists[i].songs.splice(j, 1);
                  Vue.notify({
                    group: "foo",
                    title: payload.song.name,
                    text: "is deleted from " + payload.plName,
                    duration: 3000
                  });
                  break;
                }
              }
              break;
            }
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  // Create new pl
  createNewPl({ state }, plName) {
    return new Promise((resolve, reject) => {
      playlists
        .post(
          "/add?name=" + plName,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          state.playlists.push(res.data);
          Vue.notify({
            group: "foo",
            title: "Playlist: " + plName,
            text: "is created",
            duration: 3000
          });
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deletePl({ state }, payload) {
    return new Promise((resolve, reject) => {
      playlists
        .get("/delete/" + payload.plId, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          for (let i = 0; i < state.playlists.length; i++) {
            if (state.playlists[i].id == payload.plId) {
              state.playlists.splice(i, 1);
              Vue.notify({
                group: "foo",
                title: "Playlist: " + payload.plName,
                text: "is deleted",
                duration: 3000
              });
              break;
            }
          }
          resolve(true);
        })
        .catch(err => {
          reject(false);
        });
    });
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
