<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col" style="padding:0">
          <div class="header_content d-flex flex-row align-items-center">
            <!-- Logo -->
            <div class="logo">
              <a class="d-flex flex-row align-items-end justify-content-start">
                <img src="../../assets/logo-new.png" class="logo-image" />
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
                <li :class="{ active: $route.path == '/playlists' }">
                  <a id="direc" @click="goPls">Playlists</a>
                </li>
                <li :class="{ active: $route.path == '/artists' }">
                  <a id="direc" @click="goArtists">Artists</a>
                </li>
                <li :class="{ active: $route.path == '/albums' }">
                  <a id="direc" @click="goAlbums">Albums</a>
                </li>
              </ul>
            </nav>
            <!-- User area -->
            <div class="log_reg d-flex flex-row align-items-center justify-content-start">
              <ul class="d-flex flex-row align-items-start justify-content-start">
                <!-- <li style="margin-left:20px"><a href="#">Login</a></li> -->
                <li id="textInput1">
                  <input type="text" v-model="search" />
                  <i class="fa fa-times fa-xs" v-if="search !== ''" @click="search=''"></i>
                </li>
                <li id="iconSearch">
                  <i class="fas fa-search fa-lg"></i>
                </li>
                <li style="margin-left:20px">
                  <i
                    class="fas fa-info-circle fa-lg"
                    @click="goAbout"
                    :class="{ active: $route.path == '/about' }"
                  ></i>
                </li>
                <li style="margin-left:20px">
                  <i
                    class="fa fa-user fa-lg"
                    @click="goProfile"
                    :class="{ active: $route.path == '/profile' }"
                  ></i>
                </li>
              </ul>

              <!-- Hamburger -->
              <div class="hamburger d-flex flex-column align-items-center justify-content-between">
                <i class="fa fa-bars fa-lg" aria-hidden="true" @click="showMenu = true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <menuu v-if="showMenu" @close="showMenu = false"></menuu>
  </header>
</template>
<script>
import Menuu from "./Menu";
export default {
  components: {
    Menuu
  },
  computed: {
    search: {
      get: function() {
        return this.$store.state.music_store.search;
      },
      set: function(value) {
        this.$store.state.music_store.search = value;
      }
    }
  },
  methods: {
    goHome() {
      if (this.$route.name !== "home") this.$router.push({ name: "home" });
    },
    goSongs() {
      if (this.$route.name !== "songs") this.$router.push({ name: "songs" });
    },
    goPls() {
      if (this.$route.name !== "playlists")
        this.$router.push({ name: "playlists" });
    },
    goAbout() {
      if (this.$route.name !== "about") this.$router.push({ name: "about" });
    },
    goProfile() {
      if (this.$route.name !== "profile")
        this.$router.push({ name: "profile" });
    },
    goArtists() {
      if (this.$route.name !== "artists")
        this.$router.push({ name: "artists" });
    },
    goAlbums() {
      if (this.$route.name !== "albums") this.$router.push({ name: "albums" });
    }
  },
  data() {
    return {
      showMenu: false
    };
  }
};
</script>
<style scoped>
.active {
  color: var(--color-hover);
}
</style>
