<template>
  <div class="col-lg-6 col-sm-12" style="margin-bottom:20px">
    <div class="row d-flex justify-content-center title">Album</div>
    <div class="row">
      <div class="col-lg-3 hide22">
        <img src="https://workmacro.com/wp-content/uploads/2018/02/1-by-1-1024x1024.png" />
      </div>
      <div class="col-lg-8 col-sm-12">
        <div class="d-flex flex-row align-items-center">
          <p class="album-title flex-grow-1">Album name rat la dai dai oi la dai</p>
          <i class="fa fa-random album-title__btn"></i>
          <i class="fas fa-play album-title__btn"></i>
        </div>

        <div class="d-flex flex-row album-song">
          <p>1.</p>
          <p class="flex-grow-1 text-truncate">Bai hat so 1 wwwwwwwwwwwwwwwwwwwww</p>
          <span>6:12</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 10px;
}
img {
  width: 100%;
  border-radius: 10px;
}
.album-title {
  font-size: 18px;
}
.album-song {
  cursor: pointer;
  user-select: none;
  margin: 1px 0;
}
.album-song p {
  padding-right: 5px;
}
.album-title__btn {
  margin-left: 10px;
  cursor: pointer;
}
.album-title__btn:active {
  color: var(--color-hover);
}
@media only screen and (max-width: 1000px) {
  .hide22 {
    display: none;
  }
}
</style>