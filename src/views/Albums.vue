<template>
  <div class="container albums" style="padding:0">
    <div class="row">
      <p class="title">Albums</p>
    </div>
    <div class="row" style="padding:0;margin:0">
      <Albums v-for="(playlist,index) in playlists" :key="index" :playlist="playlist" ref="pls"></Albums>
    </div>
  </div>
</template>
<script>
import Albums from "@/components/Albums/Albums";
export default {
  components: {
    Albums
  },
  data() {
    return {
      plName: "",
      showForm: false
    };
  },
  computed: {
    playlists: {
      get: function() {
        return this.$store.getters.songsGroupByAlbumFilter;
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
.row {
  margin: 0 0px;
}
.title {
  font-size: 20px;
  font-weight: 900;
  color: white;
  padding: 10px 0 0 10px;
}
.albums {
  margin-top: 85px;
  max-width: 70%;
  margin-bottom: 80px;
}
@media only screen and (max-width: 768px) {
  .albums {
    max-width: 100%;
    margin-top: 70px;
  }
}
</style>
