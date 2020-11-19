<template>
  <div class="container">
    <table class="table table-hover table-striped text-center" style="border: 1px solid">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <Article 
          v-for="(article, idx) in articles"
          :key="idx"
          :article="article"
        />
      </tbody> 
    </table>
    <button class="btn btn-primary" @click="sendToCreateArticle">글쓰기</button>
  </div>
</template>

<script>
import axios from 'axios'

import Article from '../components/Article.vue'
export default {
  name: 'Community',
  components: {
    Article
  },
  data() {
    return {
      articles: [],
    }
  },
  methods: {
    sendToCreateArticle() {
      this.$router.push({name: 'CreateArticle'})
    }
  },
  created() {
    axios.get('http://127.0.0.1:8000/api/v1/articles/')
      .then((res)=> {
        const temp = []
        res.data.forEach((element)=>{
          temp.push(element)
        })
        this.articles = temp
    }).catch((err)=>{
      console.error(err)
    })
  }
}
</script>

<style>

</style>