<template>
  <div class="container playlists">
    <div class="row">
      <h4>Playlists</h4>
    </div>
    <playlist v-for="(playlist,index) in playlists" :key="index" :playlist="playlist" ref="pls"></playlist>
    <button type="button" class="close-pl" @click.stop="collapse">Collapse</button>
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
  },
  methods: {
    collapse() {
      let a = this.$refs.pls;
      for (let i = 0; i < a.length; i++) {
        a[i].close();
      }
    }
  }
};
</script>
<style scoped>
.close-pl {
  position: fixed;
  left: 50%;
  margin-left: 10px;
  margin-top: 6px;
  height: 20px;
  top: 80px;
  color: var(--color-text);
  cursor: pointer;
  background: transparent;
  border: 0;
  transform: translateX(-50%);
  border: 1px solid var(--color-text);
  border-radius: 10px;
  padding: 0px 5px 3px 5px;
  cursor: pointer;
}
@media only screen and (max-width: 991px) {
  .close-pl {
    top: 70px;
  }
}
.close-pl:focus {
  outline-width: 0;
}
.close-pl:active {
  color: var(--color-hover);
  border: 1px solid var(--color-hover);
}
</style>
