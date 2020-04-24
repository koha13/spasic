<template>
  <div class="row" style="padding: 8px 0;">
    <div class="col-12 playlist d-flex flex-row" @click="show = !show">
      <div class="p-2 flex-grow-1 bd-highlight text">
        <p class="text title">{{ playlist.name }}</p>
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
    <div class="col-12 d-flex flex-wrap" v-if="show">
      <div class="card-songpl d-flex flex-row" v-for="(song, index) in playlist.songs" :key="index">
        <div
          :class="{
            'image-holder': true,
            current: song.id == $store.getters.currentSong.id
          }"
          @click.stop="$store.dispatch('playSong', song)"
        >
          <img v-lazy="song.songImage" alt class="image" />
          <div id="middle3">
            <i
              class="fa fa-pause fa-lg"
              v-if="
                song.id == $store.getters.currentSong.id &&
                  $store.getters.isPlaying
              "
            ></i>
            <i class="fa fa-play fa-lg" v-else></i>
          </div>
        </div>
        <div class="flex-grow-1 bd-highlight song-info2 text">
          <p class="text">{{ song.name }}</p>
          <p class="text">{{ song.artists }}</p>
        </div>
        <div class="time2">{{ song.length | minutes }}</div>
        <i class="fa fa-plus-square" style="padding: 0 8px" @click="addToPl(song)"></i>
      </div>
    </div>
    <customModal :show="showModalPl" @close="showModalPl = false" title="Add to:">
      <slot>
        <ul class="list-group list-group-flush" style="width:max-content">
          <li @click="$store.dispatch('addToCurrentList', tempSong)">
            <i class="fa fa-list-alt fa-lg"></i>
            <p>Add to queue</p>
          </li>
          <li @click="$store.dispatch('addToNextSong', tempSong)">
            <i class="fa fa-step-forward fa-lg"></i>
            <p>After current song</p>
          </li>
          <div style="width:100%; height:5px;"></div>
          <li
            v-for="(pl, index) in pls"
            :key="index"
            @click="
              addSongToPl(pl.id, pl.inPlaylist, pl.name);
              pl.inPlaylist == true
                ? (pl.inPlaylist = false)
                : (pl.inPlaylist = true);
            "
          >
            <i class="far fa-check-square fa-lg" v-if="pl.inPlaylist"></i>
            <i class="far fa-square fa-lg" v-if="!pl.inPlaylist"></i>
            <p>{{ pl.name }}</p>
          </li>
        </ul>
      </slot>
    </customModal>
  </div>
</template>
<script>
import CustomModal from "@/components/CustomModal";
export default {
  components: {
    CustomModal
  },
  props: {
    playlist: Object
  },
  data() {
    return {
      show: false,
      showModalPl: false,
      pls: [],
      tempSong: null,
      showModalDeletePl: false
    };
  },
  computed: {
    totalTime() {
      let time = 0;
      this.playlist.songs.map(song => {
        time += song.length;
      });
      return time;
    }
  },
  methods: {
    close() {
      this.show = false;
    },
    addToPl(song) {
      this.$store.dispatch("checkSong", song).then(res => {
        this.pls = res;
        this.showModalPl = true;
        this.tempSong = song;
      });
    },
    addSongToPl(plId, check, plName, song) {
      let payload = {
        song: this.tempSong,
        plId: plId,
        plName: plName
      };
      if (song != null) {
        payload.song = song;
      }
      if (!check) {
        this.$store.dispatch("addSongToPl", payload);
      } else {
        this.$store.dispatch("deleteSongFromPl", payload);
      }
    },
    deletePl() {
      this.$store.dispatch("deletePl", {
        plId: this.playlist.id,
        plName: this.playlist.name
      });
      this.showModalDeletePl = false;
    }
  }
};
</script>
<style scoped>
.playlist {
  /* height: 60px; */
  /* background: rgb(37, 41, 56); */
  align-items: center;
  border-radius: 10px;
  color: var(--color-text);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.24);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
}
.playlist .item {
  padding: 0 5px;
}
.playlist .item:active {
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
  margin: 5px 10px;
  /* background: rgb(41, 44, 58); */
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.24);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
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
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.24);
  }
  .playlist:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.24);
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
.card-songpl:hover #middle3,
.card-songpl .current #middle3 {
  opacity: 1;
}
.card-songpl:hover .image,
.card-songpl .current .image {
  opacity: 0.3;
}

/* Modal */
ul li {
  padding: 5px 0;
  position: relative;
  cursor: pointer;
}
ul li i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1rem;
}
ul li p {
  max-width: 450px;
  padding: 0 1rem 0 2.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

@media (max-width: 900px) {
  ul li p {
    max-width: 300px;
  }
}

.modal-footer {
  justify-content: center;
  padding: 5px;
}
.modal-footer button {
  width: 70px;
  height: 30px;
  border: 0;
  border-radius: 10px;
  background: var(--color3);
  padding: 2px 0 1px 0;
  margin: 5px 5px;
  cursor: pointer;
  color: var(--color-hover);
}
</style>
