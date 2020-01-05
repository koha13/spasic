<template>
  <div class="list-song">
    <div id="top">
      <p class="headerr">Next up</p>
      <i class="fa fa-chevron-down fa-sm"></i>
    </div>
    <hr style="border-top: 1px solid aqua; margin-top: 5px;" />
    <div class="content">
      <div class="container" style="max-width: 100%;;">
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
            class="col-md-12 item"
            v-for="(song, index) in allSongs"
            :key="index"
          >
            <div class="media" style="margin: 0;">
              <div class="media-left">
                <i class="fa fa-bars handle" style="padding-right:5px;"></i>
                <a
                  href="#"
                  style="width: 40px; height: 40px;margin-left: 5px; position: relative;"
                >
                  <img
                    style="width: 40px; height: 40px;"
                    class="media-object"
                    :src="song.avatar"
                  />
                  <div id="middle">
                    <i class="fa fa-play-circle-o fa-2x"></i>
                  </div>
                </a>
              </div>
              <div class="media-body">
                <p class="media-heading elle">{{ song.name }}</p>
                <p class="media-des elle">
                  {{ song.artists }}
                </p>
                <div class="media-more">
                  <p class="media-more-time" style="margin: 0; padding: 0;">
                    {{ song.length | minutes }}
                  </p>
                  <div class="media-more-but">
                    <i class="fa fa-heart fa-md"></i>
                    <i
                      style="margin-left: 10px;"
                      class="fa fa-ellipsis-h fa-md"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      drag: false
    };
  },
  components: {
    draggable
  },
  computed: {
    allSongs: {
      get: function() {
        return this.$store.state.music_store.allSongs;
      },
      set(value) {
        this.$store.commit("updateList", value);
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
