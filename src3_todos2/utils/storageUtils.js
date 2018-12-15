/*
存储数据的工具模块
 */
export default {
  // 读取todos
  readTodos () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  },

  // 保存todos
  saveTodos (todos) {
    localStorage.setItem('todos_key', JSON.stringify(todos))
  }
}