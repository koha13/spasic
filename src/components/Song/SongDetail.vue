<template>
  <div class="col-lg-6 col-sm-12">
    <div class="title-song" v-text="$store.state.music_store.currentSong.name" />
    <span style="margin-right:5px">Artist:</span>
    <router-link
      class="truncate-inform"
      tag="a"
      to="/"
      v-text="$store.state.music_store.currentSong.artists"
    />
    <br />
    <span style="margin-right:5px">Album:</span>
    <router-link
      class="truncate-inform"
      tag="a"
      to="/"
      v-text="$store.state.music_store.currentSong.album"
    />
    <hr />
    <div v-if="lyric">
      <span style="color:var(--color-hover)">Lyric:</span>
      <pre :class="{'hide' : isHideLyric}" v-text="lyric" />
      <small class="hide-btn" v-if="isHideLyric && lyric !== null" @click="isHideLyric = false">Show</small>
      <small class="hide-btn" v-else-if="lyric !== null" @click="isHideLyric = true">Hide</small>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { lyric: "", isHideLyric: true };
  },
  created() {
    this.$store
      .dispatch("getSongLyric", this.$store.state.music_store.currentSong.id)
      .then(res => {
        this.lyric = res.data.lyric;
      });
  }
};
</script>