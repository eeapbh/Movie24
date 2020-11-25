<template>
  <tr v-on:click="getArticleDetail()">
    <td>{{ getTitle }}</td>
    <td>{{ getUsername }}</td>
    <td>{{ getComments_cnt }}</td>
    <td>{{ getRead }}</td>
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
          :writer ="getUsername"
        />
      </b-modal>
  </tr>   
</template>

<script>
import axios from 'axios'
import ArticleDetail from '../components/ArticleDetail.vue'
export default {
  name: 'Article',
  components:{
    ArticleDetail
  },
  data() {
    return {
      getUsername: '',
      black:'black',
    }
  },
  props: {
    article: Object
  },
  methods: {
    getArticleDetail() {
      // this.$router.push({name: 'ArticleDetail', params: {article_pk: this.article.id, writer: this.getUsername}})
      this.$refs['detail'].show()
    },
  },
  computed: {
    getTitle() {
      return this.article.title
    },
    getRead() {
      return this.article.read
    },
    getComments_cnt(){
      return this.article.comments_cnt
    }
  },
  created() {
    const userid = this.article.user
    axios({
      url: `http://127.0.0.1:8000/api/v1/accounts/${userid}/`,
      method: 'GET',
    }).then((res)=>{
      // console.log(res)
      this.getUsername = res.data.username
    }).catch((err)=>{
      console.error(err)
    })
  }
}
</script>

<style>
  
</style>