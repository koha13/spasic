<template>
  <div class="profile container">
    <div class="row">
      <h1 class="title">Profile</h1>
    </div>
    <p>Name: {{ this.$store.state.user_store.username }}</p>
    <p>Role: {{ this.$store.state.user_store.role }}</p>
    <button type="button" class="btn btn-primary" @click="logout">Logout</button>
    <br />
    <br />
    <h5>Change password:</h5>

    <form @submit="changePassword">
      <span>Old password:</span>
      <input type="password" v-model="oldpass" />
      <span>New password:</span>
      <input type="password" v-model="newpass" />
      <button type="submit" class="btn btn-primary">Change</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.replace({ name: "login" });
    },
    changePassword() {
      axios
        .post(
          process.env.VUE_APP_BASE_API + "/auth/changepass",
          {
            newPass: this.newpass,
            oldPass: this.oldpass
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          localStorage.setItem("token", res.data.token);
        });
    }
  },
  data() {
    return {
      oldpass: "",
      newpass: ""
    };
  }
};
</script>
<style scoped>
.profile {
  margin-top: 80px;
  margin-bottom: 80px;
  color: var(--color-text);
}
.title {
  font-weight: bold;
  font-size: 20px;
  padding: 10px 0;
}
button {
  margin: 10px 0;
}
form input {
  outline: 0;
  background: transparent;
  width: 200px;
  height: 30px;
  border: 1px solid var(--color3);
  margin: 0 0 5px;
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: var(--color-text);
  border-radius: 20px;
  font-weight: 600;
  display: block;
}
</style>
