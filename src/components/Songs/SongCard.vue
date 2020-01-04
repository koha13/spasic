<template>
  <div class="card">
    <div id="image-1" style="width: 100%; height: 150px;">
      <img style="width:100%; height:150px; object-fit: cover;" :src="song.avatar" />
      <div id="middle">
        <!-- <i class="fa fa-play fa-5x"></i> -->
        <i class="fa fa-pause fa-5x"></i>
      </div>
      <div id="time">
        <span>{{song.length | minutes}}</span>
      </div>
    </div>
    <div class="card-inner">
      <div class="content">
        <p id="header">{{song.name}}</p>
        <i id="menu" class="fa fa-ellipsis-v fa-lg" @click="openCtxMenu"></i>
        <p id="art-card">{{song.artists}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    song: Object
  },
  methods: {
    openCtxMenu() {
      this.$emit("openCtxMenu", this.song, $event);
    }
  }
};
</script>
<style scoped>
.current #middle {
  opacity: 0.7;
  color: orange;
}
.current img {
  opacity: 0.5;
}
</style>