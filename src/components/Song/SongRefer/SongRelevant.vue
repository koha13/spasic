<template>
  <div class="col-lg-6 col-sm-12">
    <div
      class="row d-flex justify-content-center"
      style="font-size:20px; margin-bottom:10px"
    >Relevant</div>
    <div class="row">
      <div class="col-4 card-default1">
        <div class="img-container">
          <img src="https://workmacro.com/wp-content/uploads/2018/02/1-by-1-1024x1024.png" />
          <i class="fas fa-play fa-4x layout-up"></i>
        </div>

        <div class="song-title">Song</div>
        <br style="margin:0; padding:0;height:0" />
        <router-link to="/" tag="a" class="song-artist">Song's artist</router-link>
      </div>
      <div class="col-4 card-default1">
        <div class="img-container">
          <img src="https://workmacro.com/wp-content/uploads/2018/02/1-by-1-1024x1024.png" />
          <i class="fas fa-play fa-4x layout-up"></i>
        </div>

        <div class="song-title">Song</div>
        <br style="margin:0; padding:0;height:0" />
        <router-link to="/" tag="a" class="song-artist">Song's artist</router-link>
      </div>
      <div class="col-4 card-default1">
        <div class="img-container">
          <img src="https://workmacro.com/wp-content/uploads/2018/02/1-by-1-1024x1024.png" />
          <i class="fas fa-play fa-4x layout-up"></i>
        </div>

        <div class="song-title">Song</div>
        <br style="margin:0; padding:0;height:0" />
        <router-link to="/" tag="a" class="song-artist">Song's artist</router-link>
      </div>
      <div class="col-4 card-default1">
        <div class="img-container">
          <img src="https://workmacro.com/wp-content/uploads/2018/02/1-by-1-1024x1024.png" />
          <i class="fas fa-play fa-4x layout-up"></i>
        </div>

        <div class="song-title">Song</div>
        <br style="margin:0; padding:0;height:0" />
        <router-link to="/" tag="a" class="song-artist">Song's artist</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped >
.card-default1 {
  cursor: pointer;
}
.img-container {
  position: relative;
  transition: all 0.5s ease;
}
.layout-up {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.5s ease;
}
.card-default1:hover img {
  opacity: 0.7;
}
.card-default1:hover .layout-up {
  opacity: 1;
}
img {
  width: 100%;
  border-radius: 10px;
}
.song-title {
  display: inline;
  user-select: none;
  font-size: 17px;
  color: var(--color-text);
  padding: 0 5px;
}
.song-artist {
  display: inline-block;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.7;
  padding: 0 5px;
}
.song-artist:hover,
.song-artist:active {
  color: var(--color-hover);
}
</style>