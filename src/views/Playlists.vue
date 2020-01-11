<template>
  <div class="container playlists">
    <playlist v-for="(playlist,index) in playlists" :key="index" :playlist="playlist"></playlist>
  </div>
</template>
<script>
import Playlist from "@/components/Playlists/Playlist";
export default {
  components: {
    Playlist
  },
  created() {
    this.$store.dispatch("fetchPlaylists");
  },
  computed: {
    playlists: {
      get: function() {
        return this.$store.state.music_store.playlists;
      }
    }
  }
};
</script>
