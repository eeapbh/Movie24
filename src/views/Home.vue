<template>
  <div>
    <h1>Home</h1> 

    <h1>이번달 영화순위</h1>
    <ul class="row">
      <RecommendMovieCard
        v-for="(movie, idx) in recommendmovies"
        :key="idx"
        :movie="movie"
        class="col-lg-2 col-md-4 col-sm-6 col-xs-12"
      />
    </ul>
    <br>
    <h1>{{ username }}님의 취향저격 베스트 컨텐츠</h1>
    <ul class="row">
      <ForUserMovie
        v-for="(forusermovie, idx) in forusermovies"
        :key="idx"
        :forusermovie="forusermovie"
        class="col-lg-2 col-md-4 col-sm-6 col-xs-12"
      />
    </ul>
    
  </div>
  
</template>

<script>
import RecommendMovieCard from '../components/RecommendMovieCard.vue'
import ForUserMovie from '../components/ForUserMovie.vue'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
export default {
  components: {
    RecommendMovieCard,
    ForUserMovie,
  },
  data() {
    return {
      recommendmovies:[],
      forusermovies:[],
      username:'',
    }
  },
  methods: {
    
  },
  
  created() {
    const token = localStorage.getItem('jwt')
    console.log(jwt_decode(token))
    const user = jwt_decode(token).user_id
    this.username=jwt_decode(token).username
    axios({
      url:'http://127.0.0.1:8000/movies/bestFive/',
      method:'GET',
    }).then((res)=>{
      
      const temp=[]
      res.data.forEach(function(element){
        temp.push(element)
      })
      this.recommendmovies=temp
    }).catch((err)=>{
      console.error(err)
    }),
    axios({
      url:`http://127.0.0.1:8000/api/v1/accounts/${user}/recommend/`,
      method: 'GET',
    }).then((res)=> {
      console.log(res.data)
      const movieId = res.data.fav_movie
      axios({
        url:`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=a03503b78be406a84d592df5327b4dbd&language=en-US&page=1`,
        method: 'GET'
      }).then((res)=>{
        const tmp = []
        console.log('resdata',res.data)
        res.data.results.forEach(function(element){
          tmp.push(element)
        })
        this.forusermovies = tmp
        axios({
          url: 'http://127.0.0.1:8000/movies/forUserMovieSave/ ',
          method: 'POST',
          data: {
            forusermovies:this.forusermovies,
          },
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`
          },
        }).then((res)=>{
          console.log(res.data)
        }).catch((err)=>{
          console.error(err)
        })
        console.log(this.forusermovies)
      })
    })
    
  },
  
}
</script>

<style>
  
  
</style>