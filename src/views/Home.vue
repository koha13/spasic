<template>
  <div class="container home">
    <div class="row">
      <div class="col-lg-8 col-sm-12">
        <img src="../assets/post.png" alt class="post" />
      </div>
      <div class="col-lg-4 col-sm-12 body">
        <div class="content">
          <p class="title">SPASIC</p>
          <p>What is that?</p>
          <p>Simple streaming music website?</p>
          <p>Oh! Yes it is</p>
        </div>
      </div>
    </div>
    <div class="row divider"></div>
    <div class="row">
      <div class="col-lg-6 col-sm-12 order-lg-1 order-2 body">
        <div class="content">
          <p class="title">SPASIC</p>
          <p>Listen everywhere</p>
          <p>Everytime?</p>
          <p>Oh! Yes it is</p>
        </div>
      </div>
      <div class="col-lg-6 col-sm-12 order-lg-2 order-1">
        <img src="../assets/post2.png" alt class="post" />
      </div>
    </div>
    <div class="row divider"></div>
    <div class="row">
      <div class="col-lg-4 col-sm-12">
        <img src="../assets/post3.png" alt class="post" />
      </div>
      <div class="col-lg-8 col-sm-12 body">
        <div class="content">
          <p class="title">IT'S GOOD?</p>
          <p>No, it's clumsy af.</p>
          <p>Bad color schema. Bad UX/UI</p>
          <p>Code is extremy rot. I swear</p>
          <p>But it still works</p>
          <p>Help me improve this project.</p>
          <i class="fab fa-github"></i>
          <a href="https://github.com/koha13/spasic">/koha13/spasic</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style scoped>
.divider {
  background: var(--color-text);
  width: 100%;
  height: 1px;
  margin: 35px 0;
}
.home {
  margin-top: 85px;
  max-width: 70%;
  margin-bottom: 80px;
}
.home .post {
  max-width: 100%;
}
.home .body {
  text-align: center;
  color: var(--color-hover);
  font-size: 30px;
}
.home .body .content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.home .body .content a {
  color: var(--color-text);
}
.home .body .content .title {
  font-size: 50px;
  font-weight: 900;
}
@media only screen and (max-width: 768px) {
  .home .body {
    font-size: 20px;
  }
  .home .body .content .title {
    font-size: 25px;
    font-weight: 400;
  }
}
</style>
