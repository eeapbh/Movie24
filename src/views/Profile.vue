<template>
  <div>프로필</div>
</template>

<script>
// import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
  // data() {
  //   userInfo: []
  // },
  created() {
    // axios({
    //   url: 'http://127.0.0.1:8000/api/v1/accounts/'
    // })
    const token = localStorage.getItem('jwt')
    console.log(jwt_decode(token))
  }
}
</script>

<style>

</style>