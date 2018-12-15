<template>
  <div>
    <mt-button type="primary" style="width: 100%" @click="hint">测试使用mint-ui</mt-button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    methods: {
      hint () {
        Toast('点击了')
      }
    }
  }

</script>

<style>
</style>