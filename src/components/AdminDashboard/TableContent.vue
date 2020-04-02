<template>
  <div class="admin-dashboard__table">
    <CustomModal
      :show="showModal"
      title="Update song"
      @close="showModal=false"
      key="updateSongModal"
    >
      <div style="padding: 10px; text-align:start">
        <small class="edit-header">Song</small>
        <input class="edit-text" v-model="selectedSong.name" />
        <small class="edit-header">Artist</small>
        <input class="edit-text" v-model="selectedSong.artists" />
        <small class="edit-header">Album</small>
        <input class="edit-text" v-model="selectedSong.album" />
        <small class="edit-header">Time</small>
        <input class="edit-text" v-model="selectedSong.length" />
        <small class="edit-header">Lyric</small>
        <textarea style="width:100%" class="edit-text" v-model="selectedSong.lyric" />
      </div>
      <div slot="modal-footer" style="text-align:end;padding:10px">
        <span class="btnModal" @click="updateSongInfo">Update</span>
        <span class="btnModal" @click="showModal=false">Cancel</span>
      </div>
    </CustomModal>
    <CustomModal
      :show="showDeleteConfirmModal"
      title="Delete song"
      @close="showDeleteConfirmModal=false"
      key="deleteSongConfirmModal"
    >
      <div style="padding: 10px; text-align:start">Are you sure to delete this song</div>
      <div slot="modal-footer" style="text-align:end;padding:10px">
        <span class="btnModal" @click="deleteSong">Delete</span>
        <span class="btnModal" @click="showDeleteConfirmModal=false">Cancel</span>
      </div>
    </CustomModal>
    <table class="table table-striped table-hover" style="table-layout: fixed; width: 100%">
      <thead class="thead-light">
        <tr>
          <th scope="col" class="r1">#</th>
          <th scope="col" class="r2">Song</th>
          <th scope="col" class="r3">Artist</th>
          <th scope="col" class="p-hide">Time</th>
          <th scope="col" class="p-hide">Lyric</th>
          <th scope="col" class="r4">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song ,index) in allSongs" :key="index">
          <th scope="row" class="r1">{{index+1 | cutLongNumber}}</th>
          <td class="text-truncate" :title="song.name" v-text="song.name" />
          <td class="text-truncate" :title="song.artists" name="Artist" v-text="song.artists" />
          <td
            class="text-truncate p-hide"
            :title="song.length"
            name="Time"
          >{{song.length | minutes}}</td>
          <td
            class="text-truncate p-hide"
            :title="song.lyric"
            name="Lyric"
          >{{song.lyric?"Yes":"No"}}</td>
          <td class="r4">
            <i class="fas fa-pen-alt btn1" @click="updateSongClicked(song)"></i>
            <i class="fas fa-trash-alt btn1" @click="deleteSongClicked(song)"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import CustomModal from "@/components/CustomModal";

Vue.filter("cutLongNumber", function(value) {
  let numberString = String(value);
  if (numberString.length < 5) return value;
  return (
    numberString[0] + ".." + numberString.substring(numberString.length - 2)
  );
});
export default {
  components: {
    CustomModal
  },
  data() {
    return {
      selectedSong: {},
      showModal: false,
      showDeleteConfirmModal: false
    };
  },
  computed: {
    allSongs() {
      return this.$store.state.music_store.allSongs;
    }
  },
  methods: {
    updateSongClicked(song) {
      this.selectedSong = song;
      this.$store
        .dispatch("getSongLyric", song.id)
        .then(res => (this.selectedSong.lyric = res.data.lyric));
      this.showModal = true;
    },
    deleteSongClicked(song) {
      this.selectedSong = song;
      this.showDeleteConfirmModal = true;
    },
    updateSongInfo() {
      this.$store.dispatch("updateSongInfo", this.selectedSong);
      this.showModal = false;
    },
    deleteSong() {
      this.$store.dispatch("deleteSong", this.selectedSong);
      this.showDeleteConfirmModal = false;
    }
  }
};
</script>

<style scoped>
input {
  background: transparent;
  border: none;
  color: var(--color-text);
  width: 100%;
}
.admin-dashboard__table {
  width: 100% !important;
  text-align: center;
  margin-top: 20px;
}
.admin-dashboard__table .r1 {
  width: 50px;
}
.admin-dashboard__table .r2 {
  width: 35%;
}
.admin-dashboard__table .r3 {
  width: 30%;
}
.admin-dashboard__table .r4 {
  width: 80px;
}
.admin-dashboard__table table tr {
  cursor: default;
}
.admin-dashboard__table .btn1 {
  cursor: pointer;
  margin: 0 5px;
  border-radius: 20;
  padding: 2px;
  border-radius: 5px;
  /* background-color: rgb(218, 204, 204); */
}
.admin-dashboard__table .btn1:active {
  color: var(--color-hover);
}
@media only screen and (max-width: 768px) {
  .p-hide {
    display: none;
  }
}
*:focus {
  outline: none !important;
}

.edit-text {
  /* border-bottom: solid 1px var(--color-text); */
  margin-bottom: 10px;
}
.edit-header {
  color: var(--color-hover);
}
.btnModal {
  margin: 10px 5px 4px 5px;
  cursor: pointer;
  border-radius: 2px;
  padding: 5px;
  border: solid 1px var(--color-text);
  background-color: transparent;
  user-select: none;
}
.btnModal:active {
  background-color: rgba(204, 220, 220, 0.694);
}
</style>
