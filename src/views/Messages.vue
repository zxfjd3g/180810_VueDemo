<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <router-link :to="`/home/messages/${m.id}`">{{m.title}}</router-link>
        <button @click="pushShow(m.id)">push查看</button>
        <button @click="replaceShow(m.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">BACK</button>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        messages: []
      }
    },

    mounted () {
      console.log('Messages data()', this.$router)
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 2, title: 'message002'},
          {id: 4, title: 'message004'}
        ]
        // 更新状态数据
        this.messages = messages
      }, 1000)
    },

    methods: {
      pushShow (id) {
        // 编程式路由跳转(通过JS)
        this.$router.push(`/home/messages/${id}`)
        // this.$router.push({name: 'message', params: {id}})
      },

      replaceShow (id) {
        this.$router.replace(`/home/messages/${id}`)
      }
    }
  }
</script>

<style scoped>

</style>