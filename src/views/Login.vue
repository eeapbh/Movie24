<template>
  <div class = "bg-main">
    <div class="container">
      <br><br><br>
      <h1 class = "text-left"><b>로그인</b></h1>
      <br>
      <div class="form-group">
        <!-- <label for="username">사용자 이름</label> -->
        <input class="form-control" type="text" style = "width:500px;"
        id="username" placeholder = "사용자 이름" v-model="credentials.username">
      </div>
      <br>
      <div class="form-group">
        <!-- <label for="password">비밀번호</label> -->
        <input style = "width:500px;"
          placeholder="비밀번호"
          class="form-control" 
          type="password" 
          id="password" 
          v-model="credentials.password"
          @keypress.enter="login"
        >
      </div>
      <br>
      <button class="btn btn-primary" @click="login">로그인</button>
      <img src="'https://img.huffingtonpost.com/asset/5d808be22300001c0555597c.jpeg?ops=scalefit_630_noupscale'" 
      alt="" id="bg">
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login: function () {
      axios.post('http://127.0.0.1:8000/api/v1/accounts/api-token-auth/', this.credentials)
        .then((res) => {
          // console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$router.push({ name: 'Home' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.bg-main {
  background-image: url('https://img.huffingtonpost.com/asset/5d808be22300001c0555597c.jpeg?ops=scalefit_630_noupscale');
  background-size: 90% 100%;
  background-repeat: no-repeat;
  opacity:0.5;
}
</style>