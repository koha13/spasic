<template>
  <div class="row">
    <div class="col-sm-6 col-xs-12 col-lg-3 col-md-4" v-for="(song,index) in allSongs" :key="index">
      <songCard :song="song"></songCard>
    </div>
  </div>
</template>
<script>
import SongCard from "./SongCard";
export default {
  components: {
    SongCard
  },
  computed: {
    allSongs: {
      get: function() {
        return this.$store.state.music_store.allSongs;
      }
    }
  }
};
</script>
