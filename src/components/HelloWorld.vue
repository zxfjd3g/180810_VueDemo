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

<style>
  .title {
    color: red;
  }
</style>