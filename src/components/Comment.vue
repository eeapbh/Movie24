<template>
  <span>
    <p>{{ getComment }} - {{ getName }}</p>
    <button v-if="getName == currentName" @click="deleteComment">Delete</button>
  </span>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  data() {
    return {
      getName: '',
      currentName: '',
    }
  },
  props: {
    comment: Object,
    article_pk: Number
  },
  computed: {
    getComment() {
      return this.comment.content
    }
  },
  methods: {
    deleteComment(event) {
      event.preventDefault()
      const comment_pk = this.comment.id
      axios({
        url: `http://127.0.0.1:8000/api/v1/articles/${comment_pk}/comments_delete/`,
        method: 'DELETE'
      }).then(()=>{
        // this.$router.push({name: 'ArticleDetail', params: {article_pk: this.article_pk, writer: this.getName}})
      }).catch((err)=>{
        console.error(err)
      })
    }
  },
  created() {
    const userid = this.comment.user
    axios({
      url: `http://127.0.0.1:8000/api/v1/accounts/${userid}/`,
      method: 'GET',
    }).then((res)=>{
      // console.log(res)
      this.getName = res.data.username
    }).catch((err)=>{
      console.error(err)
    })
    const token = localStorage.getItem('jwt')
    // console.log(jwt_decode(token))
    const username = jwt_decode(token).username
    this.currentName = username
  }
}
</script>

<style>

</style>