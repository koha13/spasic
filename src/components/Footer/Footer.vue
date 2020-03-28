<template>
  <div class="ft" v-click-outside="hideExpand">
    <div class="container">
      <div class="row">
        <div class="col" style="padding:0">
          <div class="ft-content d-flex flew-row align-items-center">
            <!-- control -->
            <div class="control">
              <a class="d-flex flex-row align-items-end justify-content-start">
                <i class="fa fa-backward fa-lg" @click="$store.dispatch('backSong')"></i>
                <i
                  v-if="!$store.getters.isPlaying"
                  class="fa fa-play fa-lg"
                  @click="$store.dispatch('play')"
                ></i>
                <i v-else class="fa fa-pause fa-lg" @click="$store.dispatch('pause')"></i>
                <i class="fa fa-forward fa-lg" @click="$store.dispatch('nextSong')"></i>
                <i
                  id="hi"
                  class="fa fa-repeat fa-lg"
                  @click="$store.commit('changeLoop')"
                  v-if="$store.getters.loop == 0"
                ></i>
                <i
                  id="hi"
                  class="fa fa-repeat-1 fa-lg loopAll"
                  @click="$store.commit('changeLoop')"
                  v-else-if="$store.getters.loop == 1"
                ></i>
                <i
                  id="hi"
                  class="fa fa-repeat fa-lg loopAll"
                  @click="$store.commit('changeLoop')"
                  v-else
                ></i>
                <i
                  id="hi"
                  :class="{
                    fa: true,
                    'fa-random': true,
                    'fa-lg': true,
                    loopAll: $store.getters.random
                  }"
                  @click="$store.dispatch('changeShuffle')"
                ></i>
                <img v-lazy="$store.getters.currentSong.avatar" class="hi991" />
              </a>
            </div>

            <!-- Main Navigation -->
            <nav
              class="song-info"
              style=" cursor:pointer; user-select:none"
              @click="showExpand=!showExpand"
            >
              <p style="margin-bottom: 0; margin-top: 10px;">{{ $store.getters.currentSong.name }}</p>
              <p>{{ $store.getters.currentSong.artists }}</p>
            </nav>

            <!-- Menu -->
            <div class="menu-bot d-flex flex-row align-items-center justify-content-start">
              <ul class="d-flex flex-row align-items-start justify-content-start">
                <li>
                  <input
                    id="hi"
                    type="range"
                    class="custom-range"
                    min="0"
                    max="1"
                    step="0.1"
                    v-model="$store.state.music_store.player.volume"
                  />

                  <i
                    id="hi"
                    class="far fa-heart fa-lg"
                    v-if="!$store.state.music_store.currentSong.like"
                    @click.stop="$store.dispatch('likeSong')"
                  ></i>
                  <i
                    id="hi"
                    class="fas fa-heart fa-lg"
                    v-else
                    @click.stop="$store.dispatch('unlikeSong')"
                  ></i>
                  <i
                    class="fa fa-list-ul fa-lg"
                    @click="showCurrentList = !showCurrentList"
                    :class="{ actived: showCurrentList }"
                  ></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Plyr progress -->
    <div class="container" id="progress-plyr">
      <vue-plyr
        ref="player"
        :options="playerOptions"
        @ended="$store.dispatch('onEnd')"
        @playing="$store.state.music_store.isPlaying = true"
        @play="$store.state.music_store.isPlaying = true"
        @pause="$store.state.music_store.isPlaying = false"
        :emit="['ended','playing','play','pause']"
      >
        <audio></audio>
      </vue-plyr>
    </div>

    <!-- Song expand -->
    <transition name="slide-fade">
      <keep-alive>
        <Song v-if="showExpand" />
      </keep-alive>
    </transition>

    <!-- Curren List -->
    <transition name="slide-fade">
      <keep-alive>
        <currentList v-if="showCurrentList" @close="showCurrentList = false"></currentList>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import CurrentList from "./CurrentList";
import Song from "@/views/Song";
export default {
  components: {
    CurrentList,
    Song
  },
  data() {
    return {
      showCurrentList: false,
      showExpand: false
    };
  },
  mounted() {
    this.$store.state.music_store.player = this.$refs.player.player;
  },
  computed: {
    playerOptions() {
      const options = {
        title: "Audio",
        playsinline: true,
        controls: ["progress"],
        debug: false,
        storage: { enabled: true, key: "plyr" }
      };
      return options;
    }
  },
  methods: {
    hideExpand() {
      this.showExpand = false;
    }
  }
};
</script>
<style scoped>
.control img {
  width: 50px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 230px;
}
.actived {
  color: var(--color-hover);
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
.loopAll {
  color: var(--color-hover);
}
input[type="range"] {
  position: relative;
  width: 55px;
  left: 0px;
  z-index: 10000;
  bottom: 5px;
  border-radius: 10px;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  border-radius: 10px;
}
input[type="range"]::-webkit-slider-thumb {
  height: 10px;
  width: 10px;
  border-radius: 25px;
  background: var(--color-hover);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -4px;
}
</style>
