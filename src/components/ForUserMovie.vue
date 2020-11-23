<template>
  <div v-on:click="getMovieDetail()" class="card" style="width: 18rem;">
    <img :src="getImage" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title"><b>{{ getTitle }}</b></h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forusermovie: Object,
  },
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.forusermovie.poster_path
    },
    getTitle: function() {
      return this.forusermovie.title
    },
    getOverview: function() {
      return this.forusermovie.overview
    }
  },
  methods: {
    getMovieDetail() {
      console.log(this.forusermovie)
      this.$router.push({name: 'MovieDetail', params: {movie_pk: this.forusermovie.id}})
    },
  },
}
</script>

<style>

</style>