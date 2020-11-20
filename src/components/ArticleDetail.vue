<template>
  <div class="container">
    <h1>{{article_pk}}번 글</h1>
    <h3>{{title}}</h3>
    <h4>{{content}}</h4>
    <p>{{created_at}}</p>
    <p>{{updated_at}}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      content: '',
      created_at: '',
      updated_at: '',
    }
  },
  props: {
    article_pk: {
      type: Number,
    },
    writer: {
      writer: String,
    },
  },
  created() {
    const article_pk = this.article_pk
    axios({
      url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}`,
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      // console.log(res.data)
      this.title = res.data.title
      this.content = res.data.content
      this.created_at = res.data.created_at
      this.updated_at = res.data.updated_at
    }).catch((err)=>{
      console.error(err)
    })
  }
}
</script>

<style>

</style>