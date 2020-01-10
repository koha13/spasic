<template>
  <div class="ft">
    <div class="container">
      <div class="row">
        <div class="col" style="padding:0">
          <div class="ft-content d-flex flew-row align-items-center">
            <!-- control -->
            <div class="control">
              <a class="d-flex flex-row align-items-end justify-content-start">
                <i
                  class="fa fa-backward fa-lg"
                  @click="$store.dispatch('backSong')"
                ></i>
                <i
                  v-if="!$store.getters.isPlaying"
                  class="fa fa-play fa-lg"
                  @click="$store.dispatch('play')"
                ></i>
                <i
                  v-else
                  class="fa fa-pause fa-lg"
                  @click="$store.dispatch('pause')"
                ></i>
                <i
                  class="fa fa-forward fa-lg"
                  @click="$store.dispatch('nextSong')"
                ></i>
                <i
                  id="hi"
                  :class="{
                    fa: true,
                    'fa-repeat': true,
                    'fa-lg': true,
                    loop1: $store.getters.loop == 1,
                    loopAll: $store.getters.loop == 2
                  }"
                  @click="$store.commit('changeLoop')"
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
                <img :src="$store.getters.currentSong.avatar" class="hi991" />
              </a>
            </div>

            <!-- Main Navigation -->
            <nav class="song-info">
              <p style="margin-bottom: 0; margin-top: 10px;">
                {{ $store.getters.currentSong.name }}
              </p>
              <p>{{ $store.getters.currentSong.artists }}</p>
            </nav>

            <!-- Menu -->
            <div
              class="menu-bot d-flex flex-row align-items-center justify-content-start"
            >
              <ul
                class="d-flex flex-row align-items-start justify-content-start"
              >
                <!-- <li style="margin-left:20px"><a href="#">Login</a></li> -->
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
                  <!-- <i id="hi" class="fa fa-volume-down fa-lg"></i> -->

                  <i id="hi" class="fa fa-heart fa-lg"></i>
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
    <transition name="slide-fade">
      <keep-alive>
        <currentList
          v-if="showCurrentList"
          @close="showCurrentList = false"
        ></currentList>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import CurrentList from "@/components/CurrentList";
export default {
  components: {
    CurrentList
  },
  data() {
    return {
      showCurrentList: false
    };
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
.loop1 {
  color: aqua;
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
