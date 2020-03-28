<template>
  <div class="load d-flex">
    <img style="width:50px; height:50px" src="@/assets/login-true.gif" alt />
  </div>
</template>
<script>
export default {
  created() {
    this.$store
      .dispatch("checkToken")
      .then(res => {
        let path = this.$route.query.next;
        if (path === "/login" || !path) path = "/";
        this.$router.replace(path);
        this.$store.dispatch("fetchPlaylists");
        this.$store.dispatch("fetchAllSong");
      })
      .catch(err => {
        this.$router.replace({
          name: "login",
          query: { next: this.$route.query.next ? this.$route.query.next : "/" }
        });
      });
  }
};
</script>
<style scoped>
.load {
  width: 100vw;
  height: 100vh;
  z-index: 100000;
  justify-content: center;
  align-items: center;
}
</style>