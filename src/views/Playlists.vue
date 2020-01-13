<template>
  <div class="container playlists">
    <div class="row">
      <h4>Playlists</h4>
      <i
        class="fas fa-plus-circle fa-2x"
        style="padding:0 10px;cursor:pointer"
        @click="showForm = true"
        v-if="!showForm"
      ></i>
      <i
        class="fas fa-times-circle fa-2x"
        style="padding:0 10px;cursor:pointer"
        v-else
        @click="showForm = false; plName=''"
      ></i>
    </div>
    <div class="row" v-if="showForm">
      <form class="form-newpl" @submit.prevent="createPl">
        <input type="text" v-model="plName" />
        <button type="submit">Create</button>
      </form>
    </div>
    <playlist v-for="(playlist,index) in playlists" :key="index" :playlist="playlist" ref="pls"></playlist>

    <button type="button" class="close-pl" @click.stop="collapse">Collapse</button>
  </div>
</template>
<script>
import Playlist from "@/components/Playlists/Playlist";
export default {
  components: {
    Playlist
  },
  data() {
    return {
      plName: "",
      showForm: false
    };
  },
  created() {
    this.$store.dispatch("fetchPlaylists");
  },
  computed: {
    playlists: {
      get: function() {
        return this.$store.state.music_store.playlists;
      }
    }
  },
  methods: {
    collapse() {
      let a = this.$refs.pls;
      for (let i = 0; i < a.length; i++) {
        a[i].close();
      }
    },
    createPl() {
      this.$store.dispatch("createNewPl", this.plName).then(res => {
        this.showForm = false;
      });
    }
  }
};
</script>
<style scoped>
.close-pl {
  position: fixed;
  left: 50%;
  margin-left: 10px;
  margin-top: 6px;
  height: 20px;
  top: 80px;
  color: var(--color-text);
  cursor: pointer;
  background: transparent;
  border: 0;
  transform: translateX(-50%);
  border: 1px solid var(--color-text);
  border-radius: 10px;
  padding: 0px 5px 3px 5px;
  cursor: pointer;
}
@media only screen and (max-width: 991px) {
  .close-pl {
    top: 70px;
  }
}
.close-pl:focus {
  outline-width: 0;
}
.close-pl:active {
  color: var(--color-hover);
  border: 1px solid var(--color-hover);
}
.form-newpl input {
  width: 260px;
  background: var(--color5);
  border: 0;
  height: 30px;
  padding: 0 10px;
  font-size: 18px;
  color: var(--color-text);
  border-radius: 10px;
  display: inline-block;
}
.form-newpl button {
  background: var(--color3);
  border: 0;
  height: 30px;
  padding: 0 10px;
  margin: 0 10px;
  font-size: 18px;
  color: var(--color-text);
  border-radius: 10px;
  display: inline-block;
  cursor: pointer;
}
.form-newpl button:active {
  color: var(--color-hover);
}
.form-newpl button:focus {
  outline-width: 0;
}
</style>
