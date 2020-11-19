<template>
  <div class="container">
    <h1>Movies</h1>
    <ul class="row">
      <MovieCard 
        v-for="(movie, idx) in movies"
        :key="idx"
        :movie="movie"
        class="col-lg-4 col-md-4 col-sm-6 col-xs-12"
      />
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import MovieCard from './MoviesCard.vue'
export default {
  components: {
    MoviesCard,  
  },
  data() {
    return {
      movies: []
    }
  },
  created() {
    axios({
      url: '',
      method: 'GET',
    }).then((res)=>{
      const temp = []
      res.data.forEach(function(element){
        temp.push(element)
      })
      // console.log(temp)
      this.movies = temp
      // console.log(this.movies)
    }).catch((err)=>{
      console.error(err)
    })
  }
}
</script>

<style>

</style>