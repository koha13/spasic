<template>
  <div class="col-lg-6 col-sm-12">
    <div class="title-song">Một bài hát rất là hay</div>
    <router-link class="truncate-inform" tag="a" to="/">Của 1 tác giả rất nổi tiếng</router-link>
    <hr />
    <span style="color:var(--color-hover)">Lyric:</span>
    <pre :class="{'hide' : isHideLyric}">{{lyric}}</pre>
    <small class="hide-btn" v-if="isHideLyric && lyric !== null" @click="isHideLyric = false">Show</small>
    <small class="hide-btn" v-else-if="lyric !== null" @click="isHideLyric = true">Hide</small>
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