<template>
  <div>
    <h1>Movies</h1>
    <ul class="row">
      <MovieCard
        v-for="(movie, idx) in movies"
        :key="idx"
        :movie="movie"
        class="col-lg-5"
      />
    </ul>
  </div>
  
</template>

<script>
import MovieCard from '../components/MovieCard.vue'
export default {
  components: {
    MovieCard,
  },
  created() {
    // axios({
      
    // })
  }
}
</script>

<style>

</style>