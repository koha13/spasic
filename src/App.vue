<template>
  <div>
    <headerr v-if="$route.path!='/login'"></headerr>
    <router-view></router-view>
    <footerr v-if="$route.path!='/login'"></footerr>
  </div>
</template>
<script>
import Headerr from "@/components/Header.vue";
import Footerr from "@/components/Footer.vue";
export default {
  components: {
    Headerr,
    Footerr
  }
};
</script>
