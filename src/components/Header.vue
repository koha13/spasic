<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col" style="padding:0">
          <div class="header_content d-flex flex-row align-items-center">
            <!-- Logo -->
            <div class="logo">
              <a class="d-flex flex-row align-items-end justify-content-start">
                <img src="../assets/logo-new.png" class="logo-image" />
                <span class="logo_text">spasic</span>
              </a>
            </div>
            <!-- Main Navigation -->
            <nav class="main_nav">
              <ul class="d-flex flex-row align-items-center justify-content-start">
                <li :class="{ active: $route.path == '/' }">
                  <a id="direc" @click="goHome">Home</a>
                </li>
                <li :class="{ active: $route.path == '/songs' }">
                  <a id="direc" @click="goSongs">Songs</a>
                </li>
                <li>
                  <a id="direc">Playlists</a>
                </li>
                <li>
                  <a id="direc">About</a>
                </li>
              </ul>
            </nav>
            <!-- User area -->
            <div class="log_reg d-flex flex-row align-items-center justify-content-start">
              <ul class="d-flex flex-row align-items-start justify-content-start">
                <!-- <li style="margin-left:20px"><a href="#">Login</a></li> -->
                <li>
                  <input type="text" id="textInput1" />
                </li>
                <li style="margin-left:20px">
                  <i class="fa fa-search fa-lg"></i>
                </li>
                <li style="margin-left:20px">
                  <i class="fa fa-user fa-lg"></i>
                </li>
              </ul>

              <!-- Hamburger -->
              <div class="hamburger d-flex flex-column align-items-center justify-content-between">
                <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    goSongs() {
      this.$router.push({ name: "songs" });
    }
  }
};
</script>
