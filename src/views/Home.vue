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
          <a @click="$router.push({name:'songs'})" class="bt">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p id="bt">LISTEN NOW</p>
          </a>
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
          <a @click="$router.push({name:'songs'})" class="bt">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <p id="bt">LISTEN NOW</p>
          </a>
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
          <a href="https://github.com/koha13/spasic">: https://github.com/koha13/spasic</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

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
#bt {
  margin-bottom: -8px;
  padding: 0;
}
.home .body .content .bt {
  position: relative;
  display: inline-block;
  padding: 15px 30px;
  color: black;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-decoration: none;
  font-size: 50px;
  font-weight: 900;
  overflow: hidden;
  transition: 0.2s;
  cursor: pointer;
}
.home .body .content .bt:hover {
  color: #255784;
  background: #2196f3;
  box-shadow: 0 0 10px #2196f3, 0 0 40px #2196f3, 0 0 80px #2196f3;
  transition-delay: 1s;
}
.home .body .content .bt span {
  position: absolute;
  display: block;
}
.home .body .content .bt span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #2196f3);
}
.home .body .content .bt:hover span:nth-child(1) {
  left: 100%;
  transition: 1s;
}
.home .body .content .bt span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #2196f3);
}
.home .body .content .bt:hover span:nth-child(3) {
  left: 100%;
  transition: 1s;
  transition-delay: 0.5s;
}
.home .body .content .bt span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #2196f3);
}
.home .body .content .bt:hover span:nth-child(2) {
  top: 100%;
  transition: 1s;
  transition-delay: 0.25s;
}
.home .body .content .bt span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #2196f3);
}
.home .body .content .bt:hover span:nth-child(4) {
  bottom: 100%;
  transition: 1s;
  transition-delay: 0.75s;
}
</style>
