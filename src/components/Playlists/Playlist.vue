<template>
  <div class="row" style="padding: 8px 0;">
    <div class="col-12 playlist d-flex flex-row" @click="show = !show">
      <div class="p-2 flex-grow-1 bd-highlight text">
        <p class="text title">{{playlist.name}}</p>
        <p class="text">{{playlist.songs.length}}-songs</p>
      </div>
      <!-- <i class="fa fa-pen item"></i>
      <i class="far fa-times-circle"></i>-->
      <i class="fa fa-random item"></i>
      <i class="fa fa-play item"></i>
    </div>

    <div class="col-12 d-flex flex-wrap" v-if="show">
      <div class="card-songpl d-flex flex-row" v-for="(song,index) in playlist.songs" :key="index">
        <div class="image-holder">
          <img :src="song.avatar" alt class="image" />
          <div id="middle3">
            <i class="fa fa-play fa-lg"></i>
          </div>
        </div>
        <div class="flex-grow-1 bd-highlight song-info2 text">
          <p class="text">{{song.name}}</p>
          <p class="text">{{song.artists}}</p>
        </div>
        <div class="time2">{{song.length | minutes}}</div>
        <i class="fa fa-ellipsis-v"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    playlist: Object
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
<style scoped>
.playlist {
  height: 60px;
  background: rgb(37, 41, 56);
  align-items: center;
  border-radius: 10px;
}
.playlist .item {
  padding: 0 5px;
}
.playlist .item:hover {
  color: var(--color-hover);
}
.playlist:hover {
  box-shadow: 0 3px 6px black;
  cursor: pointer;
}
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.playlist .title {
  font-size: 18px;
}
.card-songpl {
  align-items: center;
  border-radius: 10px;
  height: 50px;
  width: 30%;
  margin: 10px 10px;
  background: rgb(41, 44, 58);
  color: var(--color-text);
  border-radius: 10px;
  padding: 5px 5px;
}
.card-songpl:hover {
  box-shadow: 0 3px 6px black;
  cursor: pointer;
}
@media only screen and (max-width: 991px) {
  .card-songpl {
    width: 45%;
  }
  .card-songpl:hover {
    box-shadow: none;
  }
  .playlist:hover {
    box-shadow: none;
  }
}
@media only screen and (max-width: 575px) {
  .card-songpl {
    width: 92%;
  }
}
.card-songpl .image {
  width: 40px;
  border-radius: 10px;
}
.card-songpl .song-info2 {
  padding: 0 10px;
}
.card-songpl .time2 {
  padding: 0 10px;
}
.card-songpl .image-holder {
  position: relative;
  width: 40px;
  height: 40px;
}
.card-songpl #middle3 {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-hover);
  opacity: 0;
}
.card-songpl:hover #middle3 {
  opacity: 1;
}
.card-songpl:hover .image {
  opacity: 0.3;
}
</style>