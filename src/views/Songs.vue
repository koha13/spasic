<template>
  <div>
    <div class="container all-song">
      <div class="row">
        <div class="col-12">
          <div id="title">
            <p>All Songs</p>
            <div id="but">
              <i
                v-if="!isSongTable"
                class="fa fa-table fa-sm"
                style="margin-right: 10px;"
                @click="changeSongView"
              ></i>
              <i
                v-if="isSongTable"
                class="fa fa-th fa-sm"
                style="margin-right: 10px;"
                @click="changeSongView"
              ></i>
              <i class="fa fa-random fa-lg"></i>
              <i class="fa fa-play fa-lg" style="margin-left: 10px;"></i>
            </div>
          </div>
          <div style="margin-bottom: 75px; ">
            <div class="all-song-content">
              <songTable v-if="isSongTable"></songTable>
              <songCards v-else></songCards>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- SideBar  tam thoi bo-->
    <!-- <div
      class="col-lg-2 col-sm-0 col-xs-0 side-bar"
      style="margin-bottom: 75px; position: fixed; top: 80px; right: 5%;"
    >
      <div style="width: 100%;">
        <p id="side-bar-header">Lyric</p>
        <p id="lyric">
          Lyrics here
        </p>
      </div>
    </div>-->
  </div>
</template>
<script>
import SongTable from "@/components/Songs/SongTable";
import SongCards from "@/components/Songs/SongCards";
export default {
  components: {
    SongTable,
    SongCards
  },
  data() {
    return {
      isSongTable: false
    };
  },
  methods: {
    changeSongView() {
      this.isSongTable = !this.isSongTable;
    }
  },
  created() {
    this.$store.dispatch("fetchAllSong");
  }
};
</script>
