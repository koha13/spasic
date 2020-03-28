<template>
  <div class="col-lg-6 col-sm-12 justify-content-start d-flex flex-column align-items-center">
    <img class="song-img card-default" :src="$store.state.music_store.currentSong.avatar" />
    <div>
      <i
        class="far fa-heart fa-2x btn-song card-default"
        v-if="!$store.state.music_store.currentSong.like"
        @click.stop="$store.dispatch('likeSong')"
      ></i>
      <i
        class="fas fa-heart fa-2x btn-song card-default"
        v-else
        @click.stop="$store.dispatch('unlikeSong')"
      ></i>

      <i class="far fa-plus-square fa-2x btn-song card-default"></i>
    </div>
  </div>
</template>

<style scoped>
.btn-song {
  margin: 5px;
  padding: 10px 30px;
  cursor: pointer;
}
</style>