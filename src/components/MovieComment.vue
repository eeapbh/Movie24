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
    movie_pk: Number
  },
  computed: {
    getComment() {
      return this.comment.content
    }
  },
  methods: {
    deleteComment(event) {
      event.preventDefault()
      const review_pk = this.movie_pk
      console.log(review_pk)
      axios({
        url: `http://127.0.0.1:8000/movies/${review_pk}/review_delete/` ,
        method: 'DELETE'
      }).then(()=>{
        this.$emit('onParentDeleteComment')
      }).catch((err)=>{
        console.error(err)
      })
    }
  },
  created() {
    console.log(this.comment)
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