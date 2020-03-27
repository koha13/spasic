<template>
  <div class="login-page">
    <div class="form">
      <h1 id="title-lg">Spasic</h1>
      <form class="login-form" @submit.prevent="onLogin">
        <div v-if="showForm == 1">
          <div class="va">
            <input type="text" placeholder="username" v-model.trim="username" />
            <div class="alert-validate" v-if="$v.username.$error">
              <div class="alert-content" v-if="!$v.username.required">Required zZz</div>
              <div class="alert-content" v-else-if="!$v.username.minLength">At least 6 characters</div>
              <div class="alert-content" v-else-if="!$v.username.maxLength">Too many characters</div>
            </div>
          </div>
          <div class="va">
            <input type="password" placeholder="password" v-model.trim="password" />
            <div class="alert-validate" v-if="$v.password.$error">
              <div class="alert-content" v-if="!$v.password.required">Required</div>
              <div class="alert-content" v-else-if="!$v.password.minLength">At least 6 characters</div>
              <div class="alert-content" v-else-if="!$v.password.maxLength">Too many characters</div>
            </div>
          </div>

          <button v-show="false" type="submit"></button>
          <a @click="onLogin">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p id="bt">SUCK</p>
          </a>
        </div>
        <img src="@/assets/login-true.gif" v-if="showForm == 2" style="width:170px" />
        <img src="@/assets/login-fail.gif" v-if="showForm == 3" style="width:200px" />
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      username: "welcomtospasic",
      password: "123456",
      showForm: true
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32)
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32)
    }
  },
  methods: {
    onLogin() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.showForm = 2;
        let loginForm = {
          username: this.username,
          password: this.password
        };
        this.$store
          .dispatch("login1", loginForm)
          .then(() => {
            this.$router.replace(this.$route.query.next);
            this.$store.dispatch("fetchPlaylists");
            this.$store.dispatch("fetchAllSong");
            this.showForm = 1;
          })
          .catch(() => {
            this.showForm = 3;
            setTimeout(() => {
              this.showForm = 1;
            }, 1000);
          });
      }
    }
  }
};
</script>
<style scoped>
#bt {
  margin-bottom: -8px;
  padding: 0;
  color: var(--color-text);
}
#title-lg {
  color: var(--color-text);
  padding-bottom: 10px;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: transparent;
  max-width: 360px;
  margin: 0 auto 100px;
  height: 320px;
  padding: 45px;
  text-align: center;
  /* box-shadow: 0 0 20px 0 var(--color-contrast), 0 5px 5px 0 rgba(0, 0, 0, 0.24); */
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: transparent;
  width: 100%;
  height: 40px;
  border: 1px solid var(--color3);
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  color: var(--color-text);
  border-radius: 20px;
  font-weight: 600;
}
a {
  position: relative;
  display: inline-block;
  padding: 15px 30px;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-decoration: none;
  font-size: 24px;
  overflow: hidden;
  transition: 0.2s;
  cursor: pointer;
}
a:hover {
  color: var(--color-text);
  background: var(--color-contrast);
  box-shadow: 0 0 10px var(--color-contrast), 0 0 40px var(--color-contrast),
    0 0 80px var(--color-contrast);
  transition-delay: 1s;
}
a span {
  position: absolute;
  display: block;
}
a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-contrast));
}
a:hover span:nth-child(1) {
  left: 100%;
  transition: 1s;
}
a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, var(--color-contrast));
}
a:hover span:nth-child(3) {
  left: 100%;
  transition: 1s;
  transition-delay: 0.5s;
}
a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, var(--color-contrast));
}
a:hover span:nth-child(2) {
  top: 100%;
  transition: 1s;
  transition-delay: 0.25s;
}
a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, var(--color-contrast));
}
a:hover span:nth-child(4) {
  bottom: 100%;
  transition: 1s;
  transition-delay: 0.75s;
}
.alert-validate::after {
  font-family: "Font Awesome 5 Pro";
  content: "\f188";
  font-weight: 300;
  position: absolute;
  top: 20px;
  right: 5px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: inline-block;
  color: orange;
}
.va {
  position: relative;
}
.alert-content {
  position: absolute;
  top: 20px;
  right: 25px;
  transform: translateY(-50%);
  height: 20px;
  border: solid #000;
  border-width: 1px;
  border-color: orange;
  border-radius: 20px;
  padding-left: 5px;
  padding-right: 5px;
  display: none;
  color: var(--color-text);
}
.alert-validate:hover .alert-content {
  display: flex;
}
</style>
