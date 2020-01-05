<template>
  <div class="list-song">
    <div id="top">
      <p class="headerr">Next up</p>
      <i class="fa fa-chevron-down fa-sm"></i>
    </div>
    <hr style="border-top: 1px solid aqua; margin-top: 5px;" />
    <div class="content">
      <div class="container" style="max-width: 100%;;">
        <div class="row">
          <div class="col-md-12 item">
            <div class="media" style="margin: 0;">
              <div class="media-left">
                <i class="fa fa-bars" style="padding-right:5px;"></i>
                <a href="#" style="width: 40px; height: 40px;margin-left: 5px; position: relative;">
                  <img
                    style="width: 40px; height: 40px;"
                    class="media-object"
                    src="https://styleguide.iu.edu/images/1-1_placeholder_768px-768px.png"
                  />
                  <div id="middle">
                    <i class="fa fa-play-circle-o fa-2x"></i>
                  </div>
                </a>
              </div>
              <div class="media-body">
                <p class="media-heading elle">Media headingwwwww</p>
                <p class="media-des elle">
                  Cras sit amet nibh
                  liberowwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
                </p>
                <div class="media-more">
                  <p class="media-more-time" style="margin: 0; padding: 0;">06:05</p>
                  <div class="media-more-but">
                    <i class="fa fa-heart fa-md"></i>
                    <i style="margin-left: 10px;" class="fa fa-ellipsis-h fa-md"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    allSongs: {
      get: function() {
        return this.$store.state.music_store.allSongs;
      }
    }
  }
};
</script>