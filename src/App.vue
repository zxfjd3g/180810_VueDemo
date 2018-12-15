<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodo="addTodo"/>
      <List :todos="todos"/>
      <TodoFooter>
        <input type="checkbox" v-model="selectAll" slot="left"/>
        <span slot="middle">已完成{{completeSize}}  / 全部{{todos.length}}</span>
        <button class="btn btn-danger" v-show="completeSize>0" @click="clearCompleteTodos" slot="right">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

  import storageUtils from './utils/storageUtils'

  export default {

    data () {
      return {
        todos: []
      }
    },

    computed: {
      // 完成的总数量
      completeSize() {
        return this.todos.reduce((pre, todo) => pre + (todo.complete ? 1 : 0), 0)
      },
      // 全选/全不选
      selectAll: {
        get() {
          return this.todos.length === this.completeSize && this.completeSize>0
        },
        set(value) {// value存储的就是当前checkbox是否选中的值
          this.selectAllTodos(value)
        }
      }
    },

    mounted () {
      // 模拟异步读取数据
      setTimeout(function () {
        const todos = storageUtils.readTodos()
        this.todos = todos
      }.bind(this), 2000)
      // 订阅消息: deleteTodo
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
    },

    methods: {
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      // 删除指定的todo
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      // 对所有todo进行全选或全不选
      selectAllTodos (isSelectAll) {
        this.todos.forEach(todo => todo.complete = isSelectAll)
      },

      // 清除所有已完成的todo
      clearCompleteTodos () {
        this.todos = this.todos.filter(todo => !todo.complete)
      }
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        /*handler: function (value) { // todos最新的值
          // 将todos的json格式数据保存到local中
          // localStorage.setItem('todos_key', JSON.stringify(value))
          storageUtils.saveTodos(value)
        }*/
        handler: storageUtils.saveTodos
        /*handler: function (todos) {
          localStorage.setItem('todos_key', JSON.stringify(todos))
        }*/
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