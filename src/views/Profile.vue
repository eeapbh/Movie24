<template>
  <div>
    <h1>{{username}}의 프로필</h1>
    <br><br>
    <h2>작성한 글</h2>
    <span v-for= "(article,idx) in articles" :key = "idx">
      <li>{{article.title}}</li>
    </span>
    <br><br>
    <h2>작성한 댓글</h2>
    <span v-for= "(comment,idx) in comments" :key = "idx">
      <li>{{comment.content}}</li>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  data: function () {
    return {
      username: '',
      articles: [],
      comments: [],
    }
  },
  created() {
    
    const token = localStorage.getItem('jwt')
    const decoded = jwt_decode(token)
    console.log(decoded)
    this.username = decoded['username']
    const userId = decoded['user_id']
    // console.log(userId)
    // 유저 articles
    axios({
      url: 'http://127.0.0.1:8000/api/v1/articles/' + String(userId) + '/profile_articles/',
      method: 'GET'
    }).then((res)=>{
      console.log(res)
      this.articles = res.data
    }).catch((err)=>{
      console.log(err)
    })
    
    // 유저 comments
    axios({
      url: 'http://127.0.0.1:8000/api/v1/articles/' + String(userId) + '/profile_comments/',
      method: 'GET'
    }).then((res)=>{
      console.log(res)
      this.comments = res.data
    }).catch((err)=>{
      console.log(err)
    })
  
  }
}
</script>

<style>

</style>