<template>
  <div>
    <headerr v-if="showPlyr"></headerr>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <footerr v-if="showPlyr"></footerr>
    <notifications group="foo" position="bottom left" />
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
    showPlyr: function() {
      if (this.$route.path == "/login" || this.$route.path == "/loading")
        return false;
      return true;
    }
  },

  created() {
    if (localStorage.getItem("darkTheme") === "true") {
      document
        .getElementById("varSource")
        .setAttribute("href", "/css/var-dark.css");
    } else {
      document.getElementById("varSource").setAttribute("href", "/css/var.css");
    }
    if (this.$route.path != "/loading")
      this.$router.replace({
        name: "loading",
        query: { next: this.$route.path }
      });
  }
};
</script>
<style>
.vue-notification {
  border-radius: 10px !important;
  color: var(--color-text) !important;
  background: var(--color3) !important;
  border-left: 5px solid var(--color5) !important;
}
.vue-notification-group {
  /* border-radius: 10px !important; */
  bottom: 80px !important;
  width: 230px !important;
}
.notification-title {
  max-width: 100% !important;
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}
</style>
