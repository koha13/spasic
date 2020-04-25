<template>
  <div class="col-lg-4 col-md-6 col-sm-12">
    <div class="album">
      <div class="image-holder">
        <img v-lazy="playlist.songs[0].songImage" />
        <div class="song-in-album">
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

      <div class="d-flex flex-row justify-content-center align-items-center" @click="show = !show">
        <div class="p-2 flex-grow-1 bd-highlight text">
          <p
            class="text title"
            @click.stop="$store.dispatch('playListSongs', playlist.songs)"
          >{{ playlist.name }}</p>
          <p class="text">
            {{
            playlist.songs.length +
            "-song" +
            (playlist.songs.length > 1 ? "s" : "")}} / {{totalTime | minutes
            }}
          </p>
        </div>
        <i class="fa fa-random item" @click.stop="$store.dispatch('addShuffle', playlist.songs)"></i>
        <i class="fa fa-play item" @click.stop="$store.dispatch('playListSongs', playlist.songs)"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    playlist: Object
  },
  computed: {
    totalTime() {
      let time = 0;
      this.playlist.songs.map(song => {
        time += song.length;
      });
      return time;
    },
    albumSong() {
      let c = 10;
      if (this.playlist.songs.length < 6) c = this.playlist.songs.length;
      return this.playlist.songs.slice(0, c);
    }
  },
  methods: {
    playSong(song) {
      this.$store.dispatch("playSong", song);
    }
  }
};
</script>
<style scoped>
.album .image-holder:hover img {
  opacity: 0.2;
  transition: all 0.5s ease;
}
.album .image-holder:hover .song-in-album {
  opacity: 1;
  transition: all 0.5s ease;
}
.album .image-holder {
  height: 300px;
  position: relative;
  transition: all 0.5s ease;
}
.album .song-in-album {
  padding: 10px;
  height: 300px;
  position: absolute;
  width: 100%;
  top: 0;
  opacity: 0;
}
.album img {
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  opacity: 1;
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.album {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: var(--color-card);
  color: var(--color-text);
  border: 0;
}
.album .item {
  padding: 0 5px;
}
.album .item:active {
  color: var(--color-hover);
}
.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.album .title {
  font-size: 18px;
}
.active {
  color: var(--color-contrast);
}
.album-song {
  cursor: pointer;
  opacity: 0.7;
  user-select: none;
  margin: 1px 0;
  padding: 2px 5px 0px 5px;
}
.album-song:hover {
  background: var(--color-item-active);
}
.album-song p {
  padding-right: 5px;
}
.title {
  cursor: pointer;
}
.album .item {
  cursor: pointer;
}
</style>