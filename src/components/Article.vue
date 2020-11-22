<template>
  <tr v-on:click="getArticleDetail()">
    <td>{{ getTitle }}</td>
    <td>{{ getUsername }}</td>
    <td>*</td>
    <td>1</td>
  </tr>   
</template>

<script>
import axios from 'axios'

export default {
  name: 'Article',
  data() {
    return {
      getUsername: '',
    }
  },
  props: {
    article: Object
  },
  methods: {
    getArticleDetail() {
      this.$router.push({name: 'ArticleDetail', params: {article_pk: this.article.id, writer: this.getUsername}})
    },
  },
  computed: {
    getTitle() {
      return this.article.title
    },
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