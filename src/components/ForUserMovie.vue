<template>
  <swiper-slide>
    <div v-on:click="getMovieDetail()" class="card bgblack" style="width: 18rem;">
      <div class="card-img"><img :src="getImage" class="card-img-top" alt=""></div>
      
      <div class="card-body">
        <h5 class="card-title"><b>{{ getTitle }}</b></h5>
      </div>
    </div>
    <b-modal 
      ref="detail" 
      size="lg" 
      class="bg-black" 
      :header-bg-variant="black"
      :body-bg-variant="black"
      :footer-bg-variant="black"
      hide-footer>
        <MovieDetail
          :movie_pk = this.forusermovie.id
        />
    </b-modal>
  </swiper-slide>
</template>

<script>
import MovieDetail from '../components/MovieDetail.vue'
export default {
  props: {
    forusermovie: Object,
  },
  components: {
    MovieDetail
  },
  data(){
    return {
      black : 'black'
    }
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
      // this.$router.push({name: 'MovieDetail', params: {movie_pk: this.forusermovie.id}})
      this.$refs['detail'].show()
    },
  },
}
</script>

<style>
.bgblack {
  background-color: black;
}
.card-img:hover {
  transform: scale(1.2)
  
}
.card-img {
  z-index: 2;
  width: 288px;
  height: 380px;
  margin-bottom: 60px;
  cursor: pointer;
}

.card-img-top {
  background-size: cover;
}

.card-body {
  z-index: 3;
}




</style>