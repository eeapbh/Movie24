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
    
  </div>
 
  
  <!-- <div class="container">
    <img :src="getImage" alt="">
    <h3>제목: {{ title }}</h3>
    <p>줄거리: {{ overview }}</p>
    <h3>평점 : {{ vote_average }}</h3>
    <h3>개봉일 : {{ release_date }}</h3>
  </div> -->
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      id:'',
      poster_path:'',
      title:'',
      vote_average:'',
      overview:'',
      release_date:'',
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
  }
}
</script>


<style>

</style>