<template>
  <div class="profile container">
    <div class="row">
      <h1 class="title">Profile</h1>
    </div>
    <p>Name: {{ this.$store.state.user_store.username }}</p>
    <p>Role: {{ this.$store.state.user_store.role }}</p>
    <button
      type="button"
      :class="{btn:true, darkTheme:darkTheme}"
      @click="darkTheme = !darkTheme"
    >Dark theme</button>
    <br />
    <button type="button" class="btn btn-primary" @click="logout">Logout</button>
    <br />
    <br />
    <h5>Change password:</h5>

    <form @submit.prevent="changePassword">
      <span>Old password:</span>
      <input type="password" v-model="oldpass" />
      <span>New password:</span>
      <input type="password" v-model="newpass" />
      <button type="submit" class="btn btn-primary">Change</button>
    </form>
    <router-link
      tag="button"
      to="/admin"
      class="btn btn-danger"
      v-if="$store.state.user_store.role === 'admin'"
    >Admin</router-link>
  </div>
</template>
<script>
import axios from "@/axios/index.js";
export default {
  created() {
    if (localStorage.getItem("darkTheme") === "true") {
      this.darkTheme = true;
    }
  },
  watch: {
    darkTheme() {
      if (this.darkTheme === true) {
        localStorage.setItem("darkTheme", "true");
        document
          .getElementById("varSource")
          .setAttribute("href", "/css/var-dark.css");
      } else {
        localStorage.setItem("darkTheme", "false");
        document
          .getElementById("varSource")
          .setAttribute("href", "/css/var.css");
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("reset");
      this.$router.replace({ name: "login" });
    },
    changePassword() {
      axios
        .post("/auth/changepass", {
          newPass: this.newpass,
          oldPass: this.oldpass
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          alert("Change pass done");
          (this.oldpass = ""), (this.newpass = "");
        });
    }
  },
  data() {
    return {
      oldpass: "",
      newpass: "",
      darkTheme: false
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
.darkTheme {
  background: black;
  color: var(--color-contrast);
}
</style>
