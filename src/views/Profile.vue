<template>
  <div class="container" style="height: 800px">
    <div class="card" style="width: 20rem; background-color:black">
      <div v-if="point > 600">
        <!-- <img src="@/assets/골드.JPG"  class="card-img-top" alt="골드"> -->
      </div>
      <div v-else-if="point > 300">
        <!-- <img src="@/assets/실버.JPG"  class="card-img-top" alt="실버"> -->
      </div>
      <div v-else>
        <!-- <img src="../assets/브론즈.JPG"  class="card-img-top" alt="브론즈"> -->
      </div>
      <!-- <img :src="require(`@/assets/images/stooges/${item.img}.jpg`)" /> -->
      <div class="card-body">
        <h4 class="card-title">{{username}}의 프로필</h4>
        <hr>
        <div v-if="point > 600">
          <p class="card-text">{{username}}님은 <b style="color:gold;">골드</b> 등급이십니다.</p>
        </div>
        <div v-else-if="point > 300">
          <p class="card-text">{{username}}님은 <b style="color:silver;">실버</b> 등급이십니다.</p>
        </div>
        <div v-else>
          <p class="card-text">{{username}}님은 <b style="color:brown;">브론즈</b> 등급이십니다.</p>
        </div>
      </div>
    </div>
    <!-- <h1>{{username}}의 프로필</h1>
    <br><br>
    <h2>랭크</h2>
    <p>{{point}}</p>
    <h2>작성한 글</h2>
    <span v-for= "(article,idx) in articles" :key = "idx">
      <li>{{article.title}}</li>
    </span>
    <br><br>
    <h2>작성한 댓글</h2>
    <span v-for= "(comment,idx) in comments" :key = "idx">
      <li>{{comment.content}}</li>
    </span> -->
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
      point: 0,
      // rank: [
      //   {

      //   }
      // ]
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

    // 유저 rank
    axios({
      url: `http://127.0.0.1:8000/api/v1/accounts/${userId}/points/`,
      method: 'GET'
    }).then((res)=>{
      // console.log(res.data)
      this.point = res.data.point
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style>

</style>