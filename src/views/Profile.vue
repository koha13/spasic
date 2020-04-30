<template>
  <div class="profile">
    <div class="container">
      <div class="box">
        <h1 class="title">Profile</h1>
      </div>
      <div class="box">
        <p>Name: {{ this.$store.state.user_store.username }}</p>
        <p>Role: {{ this.$store.state.user_store.role }}</p>
        <button type="button" class="btn btn-primary" @click="logout">Logout</button>
      </div>
      <div class="box">
        <p>Theme</p>
        <button
          type="button"
          :class="{ btn: true, darkTheme: darkTheme }"
          @click="darkTheme = !darkTheme"
        >Dark theme: {{ darkTheme }}</button>
      </div>
      <div class="box">
        <h5>Change password:</h5>

        <form @submit.prevent="changePassword">
          <span>Old password:</span>
          <input type="password" v-model="oldpass" />
          <span>New password:</span>
          <input type="password" v-model="newpass" />
          <button type="submit" class="btn btn-primary">Change</button>
        </form>
      </div>
      <div class="box" v-if="$store.state.user_store.role === 'admin'">
        <p>Admin stuff</p>
        <router-link tag="button" to="/admin" class="btn btn-danger">Admin</router-link>
      </div>
    </div>
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
        document.getElementById("adr-color").setAttribute("content", "#090b10");
      } else {
        localStorage.setItem("darkTheme", "false");
        document
          .getElementById("varSource")
          .setAttribute("href", "/css/var.css");
        document.getElementById("adr-color").setAttribute("content", "#2a555b");
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
  margin-top: 100px;
  margin-bottom: 80px;
  color: var(--color-text);
  display: flex;
  justify-content: center;
  align-self: center;
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
.container {
  max-width: 70%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-template-rows: minmax(200px, auto);
  /* margin: 40px; */
  grid-auto-flow: dense;
  grid-gap: 10px;
}
.container .box {
  background: var(--color-card);
  padding: 20px;
  display: grid;
  place-items: center;
  transition: 0.5s;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.container .box:hover {
  box-shadow: 6px 6px 6px black;
  transform: translateY(-3px);
  -webkit-transform: translateY(-3px);
  -moz-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  -o-transform: translateY(-3px);
}
img {
  object-fit: cover;
}
.container .box:nth-child(1) {
  grid-column: span 2;
  grid-row: span 1;
}
@media (max-width: 768px) {
  .container {
    width: 100%;
    margin: 0 !important;
  }
  .container .box:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}
@media (max-width: 991px) {
  .container {
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    grid-template-rows: minmax(auto, auto);
  }
  .container .box {
    grid-row: unset !important;
    grid-column: unset !important;
  }
}
</style>
