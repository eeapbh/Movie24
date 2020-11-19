<template>
  <tr>
    <td>{{ getId }}</td>
    <td>{{ getTitle }}</td>
    <td>asdas</td>
    <td>1</td>
  </tr>   
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Article',
  props: {
    article: Object
  },
  computed: {
    getId() {
      return this.article.id
    },
    getTitle() {
      return this.article.title
    },
  }
}
</script>

<style>

</style>