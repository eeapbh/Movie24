<template>
  <div class="container">
    <h1><b>Community</b></h1>
    <p></p>
    <table class="table table-hover table-striped text-center" style="border: 2px solid">
      <thead>
        <tr>
          <th>제목</th>
          <th>글쓴이</th>
          <th>댓글수</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <Article 
          v-for="(article, idx) in paginatedData"
          :key="idx"
          :article="article"
        />
      </tbody> 
    </table>
    <button class="btn btn-primary" @click="sendToCreateArticle">글쓰기</button>
    <p></p>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
    <p></p>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

import Article from '../components/Article.vue'
export default {
  name: 'Community',
  components: {
    Article
  },
  data() {
    return {
      articles: [],
      pageNum: 0,
      pageSize: 10,
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    },
    setToken: function () {
      const token = localStorage.getItem('jwt')

      const config = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      return config
    },
    sendToCreateArticle() {
      this.$router.push({name: 'CreateArticle'})
    },
  },
  computed: {
    pageCount () {
      let listLeng = this.articles.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      const sortedArticles = _.sortBy(this.articles, 'id').reverse()
      return sortedArticles.slice(start, end);
    }
  },
  created() {
    if (localStorage.getItem('jwt')) {
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/api/v1/articles/', config)
        .then((res)=> {
          const temp = []
          res.data.forEach((element)=>{
            temp.push(element)
          })
          this.articles = temp
      }).catch((err)=>{
        console.error(err)
      })
    } else {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
  .btn-cover {
    margin-top: 1.5rem;
    text-align: center;
  }
  .btn-cover .page-btn {
    width: 5rem;
    height: 2rem;
    letter-spacing: 0.5px;
  }
  .btn-cover .page-count {
    padding: 0 1rem;
  }
</style>