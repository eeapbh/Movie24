<template>
  <!-- <div class="container"> -->
  <div class="bg-main">
    <a href="/"><img src="https://fontmeme.com/permalink/201125/963eba5e895ea8f8ccbe65499ff1ac30.png" alt="netflix-type" border="0"></a>
    <div class="text-center mainText">
      
      <h1><b>24시간 영화에 대한 정보를</b></h1>
      <h1><b>무제한으로.</b></h1>
      <br>
      <h3>로그인하시고 Movie24 추천 영화 목록을 받아보세요.</h3>
      <br>
      <h4>영화 커뮤니티에서 의견을 나눠보세요.</h4>
    </div>
    
  </div>
  <!-- </div>   -->
</template>

<script>
export default {
  created() {
    if (localStorage.getItem('jwt')) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.bg-main {
  width: 100%;
  height: 800px;
  position: relative;
  margin-bottom: 250px;
  z-index: 1;
  
  
}
.bg-main::after {
  width: 100%;
  height: 800px;
  content: "";
  background-image: url('https://img.huffingtonpost.com/asset/5d808be22300001c0555597c.jpeg?ops=scalefit_630_noupscale');
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.5;

}
.mainText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-35% ,-70%);
}

a {
  position: absolute;
  top: 5%;
}
</style>