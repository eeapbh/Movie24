<template>
  <!-- <div class="container"> -->
  <div class="bg-main">
    <div class="text-center">
      <h1><b>24시간 영화에 대한 정보를</b></h1>
      <h1><b>무제한으로.</b></h1>
      <h3>로그인하시고 Movie24 추천 영화 목록을 받아보세요.</h3>
      <h4>영화 커뮤니티에서 의견을 나눠보세요.</h4>
    </div>
    <a href="/"><img src="https://fontmeme.com/permalink/201125/963eba5e895ea8f8ccbe65499ff1ac30.png" alt="netflix-type" border="0"></a>
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
  background-image: url('https://img.huffingtonpost.com/asset/5d808be22300001c0555597c.jpeg?ops=scalefit_630_noupscale');
  background-size: 90% 600%;
  background-repeat: no-repeat;
}
</style>