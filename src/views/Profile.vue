<template>
  <div class="container profilediv" style="height: 800px">
    <div class="row ml-1" style="width: 20rem; background-color:black">
      <div v-if="point > 600">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLrmBbQUIvayWSpk3PMQlMSoexcx9xKxdZkw&usqp=CAU"  class="rank-img" alt="골드">
      </div>
      <div v-else-if="point > 300">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVdjsQfrm8KSl5ZvUDZ92GhDevjYwP1EIcQ&usqp=CAU"  class="rank-img" alt="실버">
      </div>
      <div v-else>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdm4rU9A9Fu1tWHSfbDWbpw-gDezFuFQuKAQ&usqp=CAU"  class="rank-img" alt="브론즈">
      </div>
      <!-- <img :src="require(`@/assets/images/stooges/${item.img}.jpg`)" /> -->
    <div style="display: inline-block;">
      <!-- <h4>{{username}}의 프로필</h4> -->
      <hr>
      <div v-if="point > 600">
        <h5>{{username}}님은 <b style="color:gold;">골드</b> 등급이십니다.</h5>
      </div>
      <div v-else-if="point > 300">
        <h5>{{username}}님은 <b style="color:silver;">실버</b> 등급이십니다.</h5>
      </div>
      <div v-else>
        <h5>{{username}}님은 <b style="color:brown;">브론즈</b> 등급이십니다.</h5>
      </div>
    </div>
    </div>
   
    <br><br>
    <h2 class="text-left" style="color:gold">포인트</h2>
    <p class="text-left ml-1">{{point}} 점</p>
    <br>
    <hr style="background-color:white">
    <h2 class="text-left" style="color:gold">작성한 글</h2>
    <span v-for= "(article,idx) in articles" :key = "idx">
      <li class="text-left" style="list-style:none" @click="getArticleDetail(idx)">
        
        {{article.title}}
        <b-modal 
      ref="detail" 
      size="lg" 
      class="bg-black" 
      :header-bg-variant="black"
      :body-bg-variant="black"
      :footer-bg-variant="black"
      hide-footer hide-header>
        <ArticleDetail
          :article_pk ="article.id"
          :writer ="username"
        />
      </b-modal>
      </li>
    </span>
    <br><br>
    <hr style="background-color:white">
    <h2 class="text-left" style="color:gold">작성한 댓글</h2>
    <span v-for= "(comment,idx) in comments" :key = "idx">
      <li class="text-left" style="list-style:none">
        {{comment.content}} - (from {{comment.article}})
        </li>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import ArticleDetail from '../components/ArticleDetail'
export default {
  components:{
    ArticleDetail
  },
  data: function () {
    
    return {
      username: '',
      articles: [],
      comments: [],
      point: 0,
      black: 'black',
      // rank: [
      //   {

      //   }
      // ]
    }
  },
  methods:{
    getArticleDetail(idx) {
      this.$refs.detail[idx].show()
    },
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

<style scoped>

  .rank-img {
    
    width: auto; height: auto;
    max-width: 500px;
    max-height: 500px;
    border-radius: 50%;
  }
  .profilediv {
    margin-bottom: 500px;
  }
</style>