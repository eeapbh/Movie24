<template>
  <div class="container">
    <h1>Signup</h1>
    <div class="form-group">
      <label for="username">사용자 이름</label>
      <input class="form-control" type="text" id="username" v-model="credentials.username">
    </div>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input class="form-control" type="password" id="password" v-model="credentials.password">
    </div>
    <div class="form-group">
      <label for="passwordConfirmation">비밀번호 확인</label>
      <input
        class="form-control" 
        type="password" 
        id="passwordConfirmation" 
        v-model="credentials.passwordConfirmation"
        @keypress.enter="signup"
      >
    </div>
    <button class="btn btn-primary" @click="signup">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Singup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  methods: {
    signup: function () {
      axios.post('http://127.0.0.1:8000/api/v1/accounts/signup/', this.credentials)
        .then((res) => {
          console.log(res)
          this.$router.push({ name: 'Login' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>