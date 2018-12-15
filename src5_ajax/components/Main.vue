<template>
  <div>
    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-if="loading">请求中......</h2>
    <h2 v-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-if="users.length>0">
      <div class="card" v-for="(user, index) in users" :key="index">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  import axios from 'axios'

  export default {
    data () {
      return {
        firstView: true, // 初始显示第一个界面
        loading: false,
        errorMsg: '',
        users: []
      }
    },

    mounted () {
      // 订阅消息: search
      PubSub.subscribe('search', async (msg, searchName) => {
        // 更新状态数据(请求中)
        this.firstView = false
        this.loading = true
        this.users = []
        this.errorMsg = ''

        // 发异步ajax请求
        const url = `http://api.github.com/search/users?q=${searchName}`
        try {
          const response = await axios.get(url)
          // 成功了, 更新状态数据(成功)
          const result = response.data
          const users = result.items.map(item => ({
            url: item.html_url,
            avatar_url: item.avatar_url,
            username: item.login
          }))

          this.loading = false
          this.users = users
        } catch (error) {
          // 失败了, 更新状态数据(失败)
          this.loading = false
          this.errorMsg = '请求失败'
        }
      })
    }
  }
</script>

<style scoped>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>