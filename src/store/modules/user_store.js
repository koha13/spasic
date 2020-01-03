import auth from "@/axios/auth";

const state = {
  username: String,
  id: Number,
  token: String,
  role: String
};
const mutations = {
  updateUser(state, userData) {
    state.id = userData.id;
    state.username = userData.username;
    state.token = userData.token;
    state.role = userData.role;
  }
};
const actions = {
  login1({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      auth
        .post("/login", loginForm)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          commit("updateUser", res.data);
          resolve(res.data);
        })
        .catch(err => {
          reject(err.response);
        });
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
