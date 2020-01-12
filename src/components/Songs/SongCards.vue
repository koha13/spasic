<template>
  <div class="row">
    <div class="col-sm-6 col-xs-12 col-lg-3 col-md-4" v-for="(song,index) in allSongs" :key="index">
      <div :class="{card: true, current: song.id == $store.getters.currentSong.id}">
        <div id="image-1" style="width: 100%; height: 150px;" @click="playSong(song)">
          <img style="width:100%; height:150px; object-fit: cover;" :src="song.avatar" />
          <div id="middle">
            <i
              class="fa fa-pause fa-5x"
              v-if="(song.id == $store.getters.currentSong.id) && $store.getters.isPlaying"
            ></i>
            <i class="fa fa-play fa-5x" v-else></i>
          </div>
          <div id="time">
            <span>{{song.length | minutes}}</span>
          </div>
        </div>
        <div class="card-inner">
          <div class="content">
            <p id="header">{{song.name}}</p>
            <i id="menu" class="fa fa-ellipsis-v fa-lg" @click.stop="$refs.ctx.open($event, song)"></i>
            <p id="art-card">{{song.artists}}</p>
          </div>
        </div>
      </div>
    </div>
    <context-menu ref="ctx" @ctx-open="onCtxOpen" @ctx-cancel="resetCtxLocals">
      <li
        class="ctx-item"
        @click="$store.dispatch('pause')"
        v-if="songInContext === $store.getters.currentSong && $store.getters.isPlaying==true"
      >Pause</li>
      <li class="ctx-item" @click="$store.dispatch('playSong',songInContext)" v-else>Play</li>
      <li class="ctx-item">Like</li>
      <li
        class="ctx-item"
        @click="$store.dispatch('addToNextSong',songInContext)"
      >After current song</li>
      <li class="ctx-item" @click="$store.dispatch('addToCurrentList',songInContext)">Add to queue</li>
      <li class="ctx-item" @click="addToPl">Add to playlist</li>
    </context-menu>
    <customModal :show="showModalPl" @close="showModalPl = false" title="Add to:">
      <slot>
        <ul class="list-group list-group-flush" style="width:max-content">
          <li
            v-for="(pl,index) in pls"
            :key="index"
            @click="addSongToPl(pl.id,pl.inPlaylist); ((pl.inPlaylist==true)?pl.inPlaylist=false:pl.inPlaylist=true)"
          >
            <i class="far fa-check-square fa-lg" v-if="pl.inPlaylist"></i>
            <i class="far fa-square fa-lg" v-else></i>
            <p>{{pl.name}}</p>
          </li>
        </ul>
      </slot>
    </customModal>
  </div>
</template>
<script>
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import CustomModal from "@/components/CustomModal";
export default {
  components: {
    ContextMenu,
    CustomModal
  },
  computed: {
    allSongs: {
      get: function() {
        return this.$store.state.music_store.allSongs;
      }
    }
  },
  data() {
    return {
      songInContext: null,
      showModalPl: false,
      pls: []
    };
  },
  methods: {
    onCtxOpen(locals) {
      this.songInContext = locals;
    },

    resetCtxLocals() {
      this.songInContext = null;
    },
    playSong(song) {
      this.$store.dispatch("playSong", song);
    },
    addToPl() {
      this.showModalPl = true;
      this.$store.dispatch("checkSong", this.songInContext).then(res => {
        this.pls = res;
      });
    },
    addSongToPl(plId, check) {
      let payload = {
        song: this.songInContext,
        plId: plId
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
.current #image-1 #middle {
  opacity: 1;
}
.current #image-1 img {
  opacity: 0.1;
}
</style>
