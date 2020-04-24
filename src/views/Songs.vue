<template>
  <div>
    <div class="container all-song">
      <div class="row">
        <div class="col-12" id="col-song-card">
          <div id="title">
            <p>All Songs</p>
            <div id="but">
              <i
                class="fa fa-random fa-lg"
                @click="
                  $store.dispatch(
                    'addShuffle',
                    $store.state.music_store.allSongs
                  )
                "
              ></i>
              <i class="fa fa-play fa-lg" style="margin-left: 10px;" @click="playAllSongs"></i>
            </div>
          </div>
          <div style="margin-bottom: 75px; ">
            <div class="all-song-content">
              <songCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SongCards from "@/components/Songs/SongCards";
export default {
  components: {
    SongCards
  },
  methods: {
    playAllSongs() {
      this.$store.dispatch("playAllSong");
    }
  }
};
</script>
