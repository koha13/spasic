<template>
  <div>
    <headerr v-if="$route.path != '/login'"></headerr>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="container" id="progress-plyr">
      <vue-plyr
        v-if="showPlyr"
        ref="player"
        :options="playerOptions"
        @ended="$store.dispatch('onEnd')"
        :emit="['ended']"
      >
        <audio></audio>
      </vue-plyr>
    </div>
    <footerr v-if="$route.path != '/login'"></footerr>
  </div>
</template>
<script>
import Headerr from "@/components/Header/Header.vue";
import Footerr from "@/components/Footer/Footer";
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
  data() {
    return {
      showPlyr: true
    };
  },
  mounted() {
    this.$store.state.music_store.player = this.$refs.player.player;
  },
  created() {
    this.$router.push({ name: "login" });
  }
};
</script>
<style>
#progress-plyr {
  position: fixed;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 101;
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
