<template>
  <div class="ft" v-click-outside="hideExpand">
    <!-- Main footer -->
    <FooterMain
      :showCurrentList="showCurrentList"
      @changeCurrentListState="showCurrentList = !showCurrentList"
      @changeExpandState="showExpand = !showExpand"
    />

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
import FooterMain from "./FooterMain";
import Song from "@/views/Song";
export default {
  components: {
    CurrentList,
    Song,
    FooterMain
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
</style>