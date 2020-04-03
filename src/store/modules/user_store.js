import auth from "@/axios/auth";

function initialState() {
  return {
    username: String,
    id: Number,
    token: String,
    role: String,
  };
}

const state = initialState;

const mutations = {
  updateUser(state, userData) {
    state.id = userData.id;
    state.username = userData.username;
    state.token = userData.token;
    state.role = userData.role;
  },
  reset(state) {
    const s = initialState();
    Object.keys(s).forEach((key) => {
      state[key] = s[key];
    });
  },
};
const actions = {
  login1({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      auth
        .post("/login", loginForm)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          commit("updateUser", res.data);
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  },

  checkToken({ commit }) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      if (token == null) reject("Failed");
      else {
        auth
          .get("/verify/" + token)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            commit("updateUser", res.data);
            resolve(res.data);
          })
          .catch((err) => {
            reject("Failed");
          });
      }
    });
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
