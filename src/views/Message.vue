<template>
  <ul>
    <li>id: {{$route.params.id}}</li>
    <li>title: {{messageDetail.title}}</li>
    <li>content: {{messageDetail.content}}</li>
  </ul>
</template>

<script>
  const allMessageDetails = [
    {id: 1, title: 'message001', content: 'message content 001'},
    {id: 2, title: 'message002', content: 'message content 002'},
    {id: 4, title: 'message004', content: 'message content 004'}
  ]
  export default {
    data () {
      return {
        messageDetail: {}
      }
    },

    // 为什么不多次执行?
      // 切换路由时, 路径路径并没有变, 变的只是param参数
      // 但: 切换时, 组件对象的$route变了
    mounted () {
      this.showUI(this.$route)
    },

    watch: {
      $route (value) {// 最新的$route属性值
        this.showUI(value)
      }
    },

    methods: {
      showUI (route) {
        // 得到param参数中的id
        const id = route.params.id * 1
        // 查询得到对应的demail
        const detail = allMessageDetails.find(detail => detail.id===id )
        // 更新detail
        this.messageDetail = detail
      }
    }
  }
</script>

<style scoped>

</style>