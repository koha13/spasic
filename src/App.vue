<template>
  <div>
    <headerr v-if="$route.path != '/login'"></headerr>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="container" id="progress-plyr">
      <vue-plyr v-if="$route.path != '/login'" ref="player" :options="playerOptions">
        <audio>
          <source
            src="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
            type="audio/mp3"
          />
        </audio>
      </vue-plyr>
    </div>
    <footerr v-if="$route.path != '/login'"></footerr>
  </div>
</template>
<script>
import Headerr from "@/components/Header.vue";
import Footerr from "@/components/Footer.vue";
export default {
  components: {
    Headerr,
    Footerr
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
  mounted() {
    this.$store.state.music_store.player = this.$refs.player.player;
    this.$store.dispatch("play");
  }
};
</script>
<style>
#progress-plyr {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
}
.plyr__controls {
  background-color: transparent !important;
}
.plyr__progress input[type="range"]::-webkit-slider-runnable-track {
  box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3 !important;
  counter-reset: #2196f3;
}
.plyr__progress input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  border: none !important;
  box-shadow: none !important;
  background: none !important;
}
</style>
