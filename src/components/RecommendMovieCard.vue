<template>
  <swiper-slide>
    <div v-on:click="getMovieDetail()" class="card bgblack" style="width: 18rem;">
      <img :src="getImage" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title"><b>{{ getTitle }}</b></h5>
        <!-- <p class="card-text">{{ getOverview }}</p> -->
      </div>
    </div>
  </swiper-slide>
</template>

<script>
export default {
  props: {
    movie:Object
  },
  computed: {
    getImage: function() {
      return 'http://image.tmdb.org/t/p/w185'+this.movie.poster_path
    },
    getTitle: function() {
      return this.movie.title
    },
    getOverview: function() {
      return this.movie.overview
    },
    
  },
  methods: {
    getMovieDetail() {
      console.log(this.movie)
      this.$router.push({name: 'MovieDetail', params: {movie_pk: this.movie.movie_id}})
    },
  },
}
</script>

<style>
.bgblack {
  background-color: black;
}
</style>