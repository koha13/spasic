<template>
  <div class="col-lg-6 col-sm-12">
    <div class="title-song" v-text="$store.state.music_store.currentSong.name" />
    <router-link
      class="truncate-inform"
      tag="a"
      to="/"
      v-text="$store.state.music_store.currentSong.artists"
    />
    <hr />
    <div v-if="$store.state.music_store.currentSong.lyric">
      <span style="color:var(--color-hover)">Lyric:</span>
      <pre :class="{'hide' : isHideLyric}" v-text="$store.state.music_store.currentSong.lyric" />
      <small class="hide-btn" v-if="isHideLyric && lyric !== null" @click="isHideLyric = false">Show</small>
      <small class="hide-btn" v-else-if="lyric !== null" @click="isHideLyric = true">Hide</small>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    lyric: {
      type: String
    }
  },
  data() {
    return { isHideLyric: true };
  }
};
</script>