<template>
  <h2 class="title">{{msg}}</h2>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: "First Vue Component222"
      }
    }
  }
</script>

<style scoped> /*只在当前组件及子组件有效*/
  h2 {
    font-size: 40px;
  }
  .title {
    color: red;
  }
</style>