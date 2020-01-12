<template>
  <div class="menu active">
    <div class="menu_container" @click="$emit('close')">
      <div class="menu_background"></div>
      <div class="menu_close" @click.stop="$emit('close')">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="menu_content d-flex flex-column align-items-center justify-content-start">
        <nav class="menu_nav">
          <ul class="d-flex flex-column align-items-center justify-content-start">
            <li>
              <a :class="{ active: $route.path == '/' }" @click.stop="goHome">Home</a>
            </li>
            <li>
              <a :class="{ active: $route.path == '/songs' }" @click.stop="goSongs">Songs</a>
            </li>
            <li>
              <a :class="{ active: $route.path == '/playlists' }" @click.stop="goPls">Playlists</a>
            </li>
            <li>
              <a>About us</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
      this.$emit("close");
    },
    goSongs() {
      this.$router.push({ name: "songs" });
      this.$emit("close");
    },
    goPls() {
      this.$router.push({ name: "playlists" });
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 101;
  visibility: hidden;
  opacity: 0;
  -webkit-transition: all 400ms ease;
  -moz-transition: all 400ms ease;
  -ms-transition: all 400ms ease;
  -o-transition: all 400ms ease;
  transition: all 400ms ease;
}
.menu.active {
  visibility: visible;
  opacity: 1;
}
.menu_container {
  width: 100%;
  height: 100%;
}
.menu_background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.8;
}
.menu_close {
  position: absolute;
  top: 50px;
  right: 50px;
  cursor: pointer;
}
.menu_close i {
  font-size: 22px;
  color: #ffffff;
}
.menu_content {
  position: absolute;
  top: 40%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 0;
  width: 100%;
}
.menu_nav ul li {
  position: relative;
  display: inline-block;
}
.menu_nav ul li a {
  font-size: 36px;
  font-weight: 400;
  color: #ffffff;
}
.menu_nav ul li a.active {
  color: var(--color-hover);
}
</style>