<template>
  <div class="col-lg-6 col-sm-12" style="margin-bottom: 20px;">
    <div class="row d-flex justify-content-center title">Album</div>
    <div class="row">
      <div class="col-lg-3 hide22">
        <img :src="$store.state.music_store.currentSong.songImage" />
      </div>
      <div class="col-lg-8 col-sm-12">
        <div class="d-flex flex-row align-items-center">
          <p class="album-title flex-grow-1" v-text="$store.state.music_store.currentSong.album" />
          <i class="fa fa-random album-title__btn" @click="randomAlbumSong"></i>
          <i class="fas fa-play album-title__btn" @click="playAlbumSong"></i>
        </div>

        <div
          :class="{
            'd-flex': true,
            'flex-row': true,
            'album-song': true,
            active: song.id === $store.state.music_store.currentSong.id,
          }"
          v-for="song in albumSong"
          :key="song.id"
          @click="playSong(song)"
        >
          <p class="flex-grow-1 text-truncate" v-text="song.name" />
          <span>{{ song.length | minutes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    albumSong() {
      return this.$store.getters.albumSong;
    }
  },
  methods: {
    playAlbumSong() {
      this.$store.dispatch("playListSongs", this.albumSong);
    },
    randomAlbumSong() {
      this.$store.dispatch("addShuffle", this.albumSong);
    },
    playSong(song) {
      this.$store.dispatch("playSong", song);
    }
  }
};
</script>
<style scoped>
.active {
  color: var(--color-contrast);
}
.title {
  font-size: 20px;
  margin-bottom: 10px;
}
img {
  width: 100%;
  border-radius: 10px;
}
.album-title {
  font-size: 15px;
}
.album-song {
  cursor: pointer;
  opacity: 0.7;
  user-select: none;
  margin: 1px 0;
}
.album-song p {
  padding-right: 5px;
}
.album-title__btn {
  margin-left: 10px;
  cursor: pointer;
}
.album-title__btn:active {
  color: var(--color-hover);
}
@media only screen and (max-width: 1000px) {
  .hide22 {
    display: none;
  }
}
</style>
