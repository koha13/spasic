<template>
  <div class="row">
    <div
      class="col-sm-6 col-xs-12 col-lg-3 col-md-4"
      v-for="(song,index) in allSongs"
      :key="index"
      @click="test"
    >
      <div class="card">
        <div id="image-1" style="width: 100%; height: 150px;">
          <img style="width:100%; height:150px; object-fit: cover;" :src="song.avatar" />
          <div id="middle">
            <!-- <i class="fa fa-play fa-5x"></i> -->
            <i class="fa fa-pause fa-5x"></i>
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
      <li class="ctx-item" @click="playSong">Play</li>
      <li class="ctx-item">Like</li>
      <li class="ctx-item">After current song</li>
      <li class="ctx-item">Add to queue</li>
      <li class="ctx-item" @click="showModalPl=true">Add to playlist</li>
    </context-menu>
    <customModal :show="showModalPl" @close="showModalPl = false" title="Add to:">
      <slot>
        <ul class="list-group list-group-flush" style="width:max-content">
          <li>
            <p>qwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
          </li>
          <li>
            <p>qww</p>
          </li>
          <li>
            <p>qwww</p>
          </li>
        </ul>
      </slot>
    </customModal>
  </div>
</template>
<script>
import SongCard from "./SongCard";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import CustomModal from "@/components/CustomModal";
export default {
  components: {
    SongCard,
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
      showModalPl: false
    };
  },
  methods: {
    onCtxOpen(locals) {
      this.songInContext = locals;
    },

    resetCtxLocals() {
      this.songInContext = null;
    },
    playSong(locals) {
      console.log(this.songInContext);
    },
    test() {
      console.log("here");
    }
  }
};
</script>
<style scoped>
ul {
  list-style-type: armenian;
  padding: 0 1rem;
}
ul li {
  padding: 5px 0;
}
ul li p {
  max-width: 450px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  cursor: pointer;
}

@media (max-width: 900px) {
  ul li p {
    max-width: 300px;
  }
}
</style>
