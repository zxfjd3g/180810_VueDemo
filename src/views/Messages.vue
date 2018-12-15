<template>
  <div>
    <ul>
      <li v-for="m in messages" :key="m.id">
        <router-link :to="`/home/messages/${m.id}`">{{m.title}}</router-link>
      </li>
    </ul>
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
      setTimeout(() => {
        const messages = [
          {id: 1, title: 'message001'},
          {id: 2, title: 'message002'},
          {id: 4, title: 'message004'}
        ]
        // 更新状态数据
        this.messages = messages
      }, 1000)
    }
  }
</script>

<style scoped>

</style>