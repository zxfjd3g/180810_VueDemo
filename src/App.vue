<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"/>
      <List :todos="todos" :deleteTodo="deleteTodo"/>
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

    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      // 删除指定的todo
      deleteTodo (index) {
        this.todos.splice(index, 1)
      }
    },

    components: {
      TodoHeader: Header,
      List,
      TodoFooter: Footer
    }
  }

  /*function fn() {
    console.log(this)
  }
  const obj = {}
  const fn2 = fn.bind(obj)
  fn2()

  function xxx() {
    fn.call(obj)
  }*/
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