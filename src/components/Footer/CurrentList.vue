<template>
  <div class="list-song">
    <div id="top" style="position: relative">
      <p class="headerr" style="display:inline-block">Next up</p>
      <i
        id="show2"
        class="fa fa-repeat fa-lg"
        @click="$store.commit('changeLoop')"
        v-if="$store.getters.loop == 0"
        style="padding:0 5px; margin-left:10px"
      ></i>
      <i
        id="show2"
        class="fa fa-repeat-1 fa-lg loopAll"
        @click="$store.commit('changeLoop')"
        v-else-if="$store.getters.loop == 1"
        style="padding:0 5px; margin-left:10px"
      ></i>
      <i
        id="show2"
        class="fa fa-repeat fa-lg loopAll"
        @click="$store.commit('changeLoop')"
        v-else
        style="padding:0 5px; margin-left:10px"
      ></i>
      <i
        id="show2"
        :class="{
          fa: true,
          'fa-random': true,
          'fa-lg': true,
          loopAll: $store.getters.random
        }"
        @click="$store.dispatch('changeShuffle')"
        style="padding:0 5px"
      ></i>
      <div class="controls-2">
        <i
          class="fa fa-chevron-down fa-sm item"
          style="margin-left:10px"
          @click="$emit('close')"
        ></i>
      </div>
    </div>
    <hr style="border-top: 1px solid aqua; margin-top: 5px;" />
    <div class="content" id="scrolling_cur_list">
      <div class="container" style="max-width: 100%;">
        <draggable
          tag="div"
          class="row"
          @start="drag = true"
          @end="drag = false"
          v-model="allSongs"
          v-bind="dragOptions"
          handle=".handle"
        >
          <div
            :class="{
              'col-md-12': true,
              item: true,
              current1: song.id == $store.getters.currentSong.id
            }"
            v-for="(song, index) in allSongs"
            :key="index"
          >
            <div class="media" style="margin: 0;">
              <div class="media-left">
                <i class="fa fa-bars handle" style="padding-right:5px;"></i>
                <a
                  id="image-2"
                  style="width: 40px; height: 40px;margin-left: 5px; position: relative;"
                  @click="playSong(song)"
                >
                  <img
                    style="width: 40px; height: 40px;"
                    class="media-object"
                    :src="song.avatar"
                  />
                  <div id="middle">
                    <i
                      class="fa fa-pause-circle fa-2x"
                      v-if="
                        song.id == $store.getters.currentSong.id &&
                          $store.getters.isPlaying
                      "
                    ></i>
                    <i class="fas fa-play-circle fa-2x" v-else></i>
                  </div>
                </a>
              </div>
              <div class="media-body">
                <p class="media-heading elle">{{ song.name }}</p>
                <p class="media-des elle">{{ song.artists }}</p>
                <div class="media-more">
                  <p class="media-more-time" style="margin: 0; padding: 0;">
                    {{ song.length | minutes }}
                  </p>
                  <div class="media-more-but">
                    <i class="fa fa-heart fa-md"></i>
                    <i
                      style="margin-left: 10px;"
                      class="fa fa-ellipsis-h fa-md"
                      @click.stop="$refs.ctx2.open($event, song)"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <context-menu ref="ctx2" @ctx-open="onCtxOpen" @ctx-cancel="resetCtxLocals">
      <li
        class="ctx-item"
        @click="$store.dispatch('pause')"
        v-if="
          songInContext === $store.getters.currentSong &&
            $store.getters.isPlaying == true
        "
      >
        Pause
      </li>
      <li
        class="ctx-item"
        @click="$store.dispatch('playSong', songInContext)"
        v-else
      >
        Play
      </li>
      <li class="ctx-item">Like</li>
      <li
        class="ctx-item"
        @click="$store.dispatch('addToNextSong', songInContext)"
      >
        After current song
      </li>
      <li class="ctx-item" @click="addToPl">Add to playlist</li>
      <li
        class="ctx-item"
        @click="$store.commit('deleteFromQueue', songInContext.id)"
      >
        Remove
      </li>
    </context-menu>
    <customModal
      :show="showModalPl"
      @close="showModalPl = false"
      title="Add to:"
    >
      <slot>
        <ul class="list-group list-group-flush" style="width:max-content">
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
            <i class="far fa-square fa-lg" v-else></i>
            <p>{{ pl.name }}</p>
          </li>
        </ul>
      </slot>
    </customModal>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import CustomModal from "@/components/CustomModal";
export default {
  data() {
    return {
      drag: false,
      songInContext: null,
      showModalPl: false,
      pls: []
    };
  },
  components: {
    draggable,
    ContextMenu,
    CustomModal
  },
  computed: {
    allSongs: {
      get: function() {
        return this.$store.state.music_store.currentList;
      },
      set(value) {
        this.$store.commit("updateCurrentList", value);
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
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
    addSongToPl(plId, check, plName) {
      let payload = {
        song: this.songInContext,
        plId: plId,
        plName: plName
      };
      if (!check) {
        this.$store.dispatch("addSongToPl", payload);
      } else {
        this.$store.dispatch("deleteSongFromPl", payload);
      }
    }
  },
  activated() {
    let temp = document.getElementsByClassName("current1");
    if (temp.length > 0) {
      let topPos = temp[0].offsetTop;
      document.getElementById("scrolling_cur_list").scrollTop = topPos - 70;
    }
  }
};
</script>
<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.handle {
  float: left;
  padding-top: 13px;
  padding-bottom: 8px;
}
</style>
<style scoped>
.current1 #image-2 img {
  opacity: 0.1;
}
.current1 #image-2 #middle {
  opacity: 1;
}
.current1 {
  background-color: rgb(43, 54, 80);
}
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
.loopAll {
  color: var(--color-hover);
}
</style>
