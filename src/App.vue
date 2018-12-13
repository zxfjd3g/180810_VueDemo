<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader/>
      <List :todos="todos"/>
      <TodoFooter/>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  export default {

    data () {
      return {
        todos: [
          {complete: false, title: '吃饭'},
          {complete: true, title: '睡觉'},
          {complete: false, title: '打代码'},
        ]
      }
    },

    components: {
      TodoHeader: Header,
      List,
      TodoFooter: Footer
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>