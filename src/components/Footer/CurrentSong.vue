<template>
  <div id="currentSong">
    <div class="container cs-title" @click="$emit('hideExpand')">
      CURRENT SONG
      <i class="fas fa-arrow-down"></i>
    </div>
    <div class="container specific-song">
      <div>
        <div class="row">
          <SongImage />
          <SongDetail />
        </div>
        <hr />
        <SongRefer />
      </div>
    </div>
  </div>
</template>

<script>
import SongImage from "@/components/Song/SongImage";
import SongDetail from "@/components/Song/SongDetail";
import SongRefer from "@/components/Song/SongRefer/SongRefer";
export default {
  components: {
    SongImage,
    SongDetail,
    SongRefer,
  },
  activated() {
    document.getElementById("currentSong").scrollTop = 0;
  },
};
</script>

<style>
.specific-song {
  max-width: 68%;
  padding-top: 5px;
  margin-bottom: 0px;
  padding-bottom: 15px;
  color: var(--color-text);
  height: calc(100vh - 200px);
  overflow-y: scroll;
  position: relative;
  background: linear-gradient(rgb(32, 44, 45), var(--color-main));
  opacity: 0.98;
}
.cs-title {
  background: rgb(32, 44, 45);
  padding-top: 3px;
  max-width: 30%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  cursor: pointer;
}
.specific-song .song-img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
}
.specific-song .title-song {
  overflow-wrap: break-word;
  width: calc(100%);
  font-size: 20px;
  margin-bottom: 0px;
  padding-right: 0;
  margin-right: 0;
}
.specific-song .truncate-inform {
  display: inline;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.7;
  padding: 0;
  margin: 0;
}
.specific-song pre {
  color: var(--color-text);
  overflow: hidden;
  white-space: pre-wrap;
  margin-bottom: 0;
}
.specific-song .truncate-inform:hover,
.specific-song .truncate-inform:active {
  color: var(--color-hover);
}
.specific-song .hide-btn {
  color: var(--color-hover);
  cursor: pointer;
  user-select: none;
}
.specific-song .hide {
  height: 105px;
}
.card-default {
  border-radius: 10px;
  background: var(--color-card);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s ease-in-out;
}
.card-default:hover,
.card-default:active {
  box-shadow: 6px 6px 6px black;
  transform: translateY(-3px);
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@media only screen and (max-width: 768px) {
  .specific-song {
    max-width: 100%;
  }
  .cs-title {
    max-width: 70%;
  }
  .card-default:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transform: none;
  }
}
</style>
