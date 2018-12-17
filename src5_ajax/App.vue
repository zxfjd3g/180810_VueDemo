<template>
  <div>
    <h2 v-if="!repoName">LOADING...</h2>
    <p v-else>
      most star repo is
      <a :href="repoUrl">{{repoName}}</a>
    </p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        repoUrl: '',
        repoName: ''
      }
    },

    async mounted () {
      const url = 'https://api.github.com/search/repositories?q=vu&sort=stars'
      // 使用vue-resource发送异步ajax请求
      /*this.$http.get(url).then(response => {
        // 处理成功
        const result = response.data
        const mostRepo = result.items[0]
        this.repoUrl = mostRepo.html_url
        this.repoName = mostRepo.name
      }).catch(error => {
        // 处理失败
        alert('请求失败了')
      })*/

      // 使用axios发送异步ajax请求
      /*axios.get(url).then(response => {
        // 处理成功
        const result = response.data
        const mostRepo = result.items[0]
        this.repoUrl = mostRepo.html_url
        this.repoName = mostRepo.name
      }).catch(error => {
        // 处理失败
        alert('请求失败了')
      })*/

      // const promise = axios.get(url)
      try {
        const response = await axios.get(url)
        const result = response.data
        const mostRepo = result.items[0]
        this.repoUrl = mostRepo.html_url
        this.repoName = mostRepo.name
      } catch (error) {
        alert('请求失败了')
      }
    }
  }

</script>

<style>
</style>