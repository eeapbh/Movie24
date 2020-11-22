<template>
  <div>
    <div class="card mr-auto ml-auto" style="width: 18rem;">
      <div class="card-header">
        <div class='row'>
          <p class="my-2 ml-4"><b>{{ getName }}</b></p>
        </div>
      </div>
      <div class="card-body">
        <p class="card-text" style="text-align: left;">{{ getComment }}</p>
      </div>
      <div class="card-footer text-muted">
        <a class="card-link" v-if="getName == currentName" @click="deleteComment">댓글 삭제</a>
      </div>
    </div>
    <br>
  </div>
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
        this.$emit('onParentDeleteComment')
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