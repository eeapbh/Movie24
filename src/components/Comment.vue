<template>
  <div>
    <p>{{ getComment }} - {{ getname }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      getname: '',
    }
  },
  props: {
    comment: Object
  },
  computed: {
    getComment() {
      return this.comment.content
    }
  },
  created() {
    const userid = this.comment.user
    axios({
      url: `http://127.0.0.1:8000/api/v1/accounts/${userid}`,
      method: 'GET',
    }).then((res)=>{
      // console.log(res)
      this.getname = res.data.username
    }).catch((err)=>{
      console.error(err)
    })
  }
}
</script>

<style>

</style>