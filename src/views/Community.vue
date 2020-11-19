<template>
  <div>
    <table class="table table-hover table-striped text-center" style="border: 1px solid">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <Article />
      </tbody> 
    </table>
  </div>
</template>

<script> 
import Article from '../components/Article.vue'
export default {
  name: 'Community',
  components: {
    Article
  },
  data() {
    return {
      articles: [],
    }
  }
}
</script>

<style>

</style>