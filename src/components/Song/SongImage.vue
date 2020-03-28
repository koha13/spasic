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

      <i class="far fa-plus-square fa-2x btn-song card-default" @click="openAddToPl"></i>
    </div>
    <customModal :show="showAddPlModal" @close="showAddPlModal = false" title="Add to:">
      <slot>
        <ul class="list-group list-group-flush" style="width:max-content">
          <div style="width:100%; height:5px;"></div>
          <li
            v-for="pl in pls"
            :key="pl.id"
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
  data() {
    return {
      showAddPlModal: false,
      pls: []
    };
  },
  methods: {
    openAddToPl() {
      this.$store
        .dispatch("checkSong", this.$store.state.music_store.currentSong)
        .then(res => {
          this.pls = res;
          this.showAddPlModal = true;
        });
    },
    addSongToPl(plId, check, plName) {
      let payload = {
        song: this.$store.state.music_store.currentSong,
        plId: plId,
        plName: plName
      };
      if (!check) {
        this.$store.dispatch("addSongToPl", payload);
      } else {
        this.$store.dispatch("deleteSongFromPl", payload);
      }
    }
  }
};
</script>
<style scoped>
.btn-song {
  margin: 5px;
  padding: 10px 30px;
  cursor: pointer;
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