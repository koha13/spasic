<template>
  <div class="container playlists">
    <div class="row">
      <p class="title">Playlists</p>
      <i
        class="fas fa-plus-circle fa-lg"
        style="padding:15px 10px;cursor:pointer; color:var(--color-text)"
        @click="showForm = true"
        v-if="!showForm"
      ></i>
      <i
        class="fas fa-times-circle fa-lg"
        style="padding:15px 10px;cursor:pointer;color:var(--color-text)"
        v-else
        @click="showForm = false; plName=''"
      ></i>
    </div>
    <div class="row" v-if="showForm">
      <form class="form-newpl" @submit.prevent="createPl">
        <input type="text" v-model="plName" onclick="this.setSelectionRange(0, this.value.length)" />
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
  async created() {
    await this.$store.dispatch("fetchPlaylists");
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
      this.$store
        .dispatch("createNewPl", this.plName)
        .then(res => {
          this.showForm = false;
          this.plName = "";
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: err.response.data.message
          });
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
  background: var(--color3);
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
.row {
  margin: 0 0px;
}
.title {
  font-size: 20px;
  font-weight: 900;
  color: white;
  padding: 10px 0 0 10px;
}
</style>
