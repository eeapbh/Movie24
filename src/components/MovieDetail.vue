<template>

 
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="getImage" alt="">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">{{ title }}</h2>
          <h5>개봉일 : {{ release_date }}</h5>
          <p class="card-text">줄거리: {{ overview }}</p>
          <p class="card-text">평점 : {{ vote_average }}</p>
        </div>
      </div>
    </div>
    <form @submit="commentSubmit">
      <div class="form-group">
        <h3>평점</h3>
        <input type="number" min="0" max="10" class="form-control" id="rating" v-model="myrating">
        <hr>
        <label for="comment">댓글을 입력하세요.</label>
        <textarea class="form-control" id="comment" rows="2" v-model="mycomment" @keypress.enter="commentSubmit"></textarea>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
    <hr>
    <MovieComment 
      v-for="(comment, idx) in comments"
      :key="idx"
      :comment="comment"
      :movie_pk="movie_pk"
    />
  </div>
  
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import MovieComment from '../components/MovieComment.vue'
export default {
  components: {
    MovieComment
  },
  data() {
    return {
      id:'',
      poster_path:'',
      title:'',
      vote_average:'',
      overview:'',
      release_date:'',
      mycomment:'',
      myrating:'',
      comments:[],
    }
  },
  props: {
    movie_pk: Number, 
  },
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.poster_path
    },
   
  },
  methods: {
    commentSubmit(event) {
      event.preventDefault()
      if (this.mycomment.length !== 0) {
        const movie_pk = this.movie_pk
        const token = localStorage.getItem('jwt')
        console.log(jwt_decode(token))
        const user = jwt_decode(token).user_id
        // console.log(user)
        axios({
          url: `http://127.0.0.1:8000/movies/${movie_pk}/reviews/`,
          method: 'POST',
          data: {
            user: user,
            content: this.mycomment,
            rating: this.myrating,
          },
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`
          },
        }).then(()=>{
          // console.log(res.data)
          axios({
            url: `http://127.0.0.1:8000/movies/${movie_pk}/reviews/`,
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
  },
  created() {
    const movie_pk = this.movie_pk
    
    axios({
      url: `http://127.0.0.1:8000/movies/${movie_pk}/`,
      method: 'GET',
      
    }).then((res)=>{
      
      this.id = res.data.id
      this.poster_path = res.data.poster_path
      this.title = res.data.title
      this.vote_average = res.data.vote_average
      this.overview = res.data.overview
      this.release_date = res.data.release_date
    }).catch((err)=>{
      console.error(err)
    })
    axios({
      url: `http://127.0.0.1:8000/movies/${movie_pk}/reviews/`,
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