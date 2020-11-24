<template>
  <swiper-slide>
    <div v-on:click="getMovieDetail()" class="card bgblack" style="width: 18rem;">
      <img :src="getImage" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title"><b>{{ getTitle }}</b></h5>
      </div>
    </div>
  </swiper-slide>
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
      console.log('눌렀을떄',this.forusermovie)
      this.$router.push({name: 'MovieDetail', params: {movie_pk: this.forusermovie.id}})
    },
  },
}
</script>

<style>
.bgblack {
  background-color: black;
}
</style>