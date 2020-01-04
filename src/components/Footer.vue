<template>
  <div class="ft">
    <div class="container" id="progressbar">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          style="width: 75%"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col" style="padding:0">
          <div class="ft-content d-flex flew-row align-items-center">
            <!-- control -->
            <div class="control">
              <a class="d-flex flex-row align-items-end justify-content-start">
                <i class="fa fa-backward fa-lg"></i>
                <i class="fa fa-play fa-lg"></i>
                <i class="fa fa-forward fa-lg"></i>
                <i id="hi" class="fa fa-repeat fa-lg"></i>
              </a>
            </div>

            <!-- Main Navigation -->
            <nav class="song-info">
              <p
                style="margin-bottom: 0; margin-top: 10px;"
              >qwewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
              <p>qwe</p>
            </nav>

            <!-- Menu -->
            <div class="menu-bot d-flex flex-row align-items-center justify-content-start">
              <ul class="d-flex flex-row align-items-start justify-content-start">
                <!-- <li style="margin-left:20px"><a href="#">Login</a></li> -->
                <li>
                  <i id="hi" class="fa fa-volume-down fa-lg"></i>
                  <i id="hi" class="fa fa-random fa-lg"></i>
                  <i class="fa fa-list-ul fa-lg"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.progress {
  height: 2px;
  color: 2196f3;
  background-color: transparent;
  box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;
}
</style>
