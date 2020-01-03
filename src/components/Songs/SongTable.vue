<template>
  <div class="col-12">
    <table class="table table-hover" style="table-layout: fixed; width: 100%">
      <thead>
        <tr>
          <th id="r1" scope="col">#</th>
          <th id="r2" scope="col">Name</th>
          <th id="r3" scope="col">Artists</th>
          <th id="r4" scope="col">Time</th>
          <th id="mobile-only" scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song,index) in allSongs" :key="index">
          <th id="r1">{{index+1}}</th>
          <td id="r2" style="word-wrap: break-word;">{{song.name}}</td>
          <td id="r3">{{song.artists}}</td>
          <td id="r4">{{song.length | minutes}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  computed: {
    allSongs: {
      get: function() {
        return this.$store.state.music_store.allSongs;
      }
    }
  }
};
</script>
