<template>
  <div class="card">
    <img src="" alt="">
    <div class="card-body">
      <h5 class="card-title"><b>{{ getTitle}}</b></h5>
      <p class="card-text">{{getOverview}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie:Object
  },
  computed: {
    getImage: function() {
      return this.movie.poster_path
    },
    getTitle: function() {
      return this.movie.title
    },
    getOverview: function() {
      return this.movie.overview
    },
  }
}
</script>

<style>

</style>