<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="selectAll"/>
    </label>
    <span>
      <span>已完成{{completeSize}}  / 全部{{todos.length}}</span>
    </span>
    <button class="btn btn-danger" v-show="completeSize>0" @click="clearCompleteTodos">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    props: {
      todos: Array,
      selectAllTodos: Function,
      clearCompleteTodos: Function
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
    }
  }
</script>

<style scoped>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>