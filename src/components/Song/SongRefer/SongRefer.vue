<template>
  <div class="row song-refer">
    <SongAlbum />
    <SongRelevant />
  </div>
</template>
<script>
import SongRelevant from "./SongRelevant";
import SongAlbum from "./SongAlbum";
export default {
  components: {
    SongRelevant,
    SongAlbum
  }
};
</script>