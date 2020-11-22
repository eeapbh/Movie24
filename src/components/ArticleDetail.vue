<template>
  <div class="container">
    <div>
      <h1>{{article_pk}}번 글</h1>
      <h3>{{title}}</h3>
      <h4>{{content}}</h4>
      <p>{{created_at}}</p>
      <p>{{updated_at}}</p>
    </div>
    <hr>
    <div v-if="writer == currentName">
      <button class="btn btn-success" @click="updateArticle">Update</button>
      <p></p>
      <button class="btn btn-danger" @click="deleteArticle">Delete</button>
    </div>
    <hr>
    <form @submit="commentSubmit">
      <div class="form-group">
        <label for="comment">댓글을 입력하세요.</label>
        <textarea class="form-control" id="comment" rows="2" v-model="mycomment" @keypress.enter="commentSubmit"></textarea>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
    <hr>
    <Comment 
      v-for="(comment, idx) in comments"
      :key="idx"
      :comment="comment"
      :article_pk="article_pk"
      @onParentDeleteComment="onParentDeleteComment"
    />
  </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Comment from '../components/Comment.vue'
export default {
  components: {
    Comment
  },
  data() {
    return {
      title: '',
      content: '',
      created_at: '',
      updated_at: '',
      mycomment: '',
      comments: [],
      currentName: '',
    }
  },
  props: {
    article_pk: {
      type: Number,
    },
    writer: {
      type: String,
    },
  },
  methods: {
    commentSubmit(event) {
      event.preventDefault()
      if (this.mycomment.length !== 0) {
        const article_pk = this.article_pk
        const token = localStorage.getItem('jwt')
        // console.log(jwt_decode(token))
        const user = jwt_decode(token).user_id
        // console.log(user)
        axios({
          url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}/comments/`,
          method: 'POST',
          data: {
            user: user,
            content: this.mycomment
          },
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`
          },
        }).then(()=>{
          // console.log(res.data)
          axios({
            url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}/comments/`,
            method: 'GET',
          }).then((res)=>{
              const temp = []
              res.data.forEach((element)=>{
                temp.push(element)
              })
              this.comments = temp
          }).catch((err)=>{
            console.error(err)
          })
        }).catch((err)=>{
          console.error(err)
        })
        this.mycomment = ''
      } else {
        alert("댓글을 입력하세요.")
      }
    },
    onParentDeleteComment: function() {
      const article_pk = this.article_pk
      axios({
        url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}/comments/`,
        method: 'GET',
      }).then((res)=>{
          const temp = []
          res.data.forEach((element)=>{
            temp.push(element)
          })
          this.comments = temp
      }).catch((err)=>{
        console.error(err)
      })
    },
    deleteArticle(event) {
      event.preventDefault()
      const article_pk = this.article_pk
      axios({
        url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}/`,
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then(()=>{
        this.$router.push({name: 'Community'})
      }).catch((err)=>{
        console.error(err)
      })
    },
    updateArticle() {
      console.log(this.article_pk)
      this.$router.push({name: 'UpdateArticle', params: {article_pk: this.article_pk, currentTitle: this.title, currentContent: this.content}})
    }
  },
  created() {
    const article_pk = this.article_pk
    axios({
      url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}/`,
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
    }),
    axios({
      url: `http://127.0.0.1:8000/api/v1/articles/${article_pk}/comments/`,
      method: 'GET',
    }).then((res)=>{
        const temp = []
        res.data.forEach((element)=>{
          temp.push(element)
        })
        this.comments = temp
    }).catch((err)=>{
      console.error(err)
    })
    const token = localStorage.getItem('jwt')
    // console.log(jwt_decode(token))
    const username = jwt_decode(token).username
    this.currentName = username
  },
}
</script>

<style>

</style>