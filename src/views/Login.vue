<template>
  <div class="container">
    <h1><b>로그인</b></h1>
    <br>
    <br>
    <div class="form-group">
      <label for="username">사용자 이름</label>
      <input class="form-control" type="text" id="username" v-model="credentials.username">
    </div>
    <br>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input
        class="form-control" 
        type="password" 
        id="password" 
        v-model="credentials.password"
        @keypress.enter="login"
      >
    </div>
    <br>
    <button class="btn btn-primary" @click="login">로그인</button>
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
