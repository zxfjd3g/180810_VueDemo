/*
包含n个用于间接更新状态数据的方法的对象
异步action: 包含异步代码
同步action: 不包含异步代码

在action中通过commit()向mutation提交数据时: 不是提交数据本身, 而总是提交包含数据的对象
 */
import axios from 'axios'
import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
} from './mutation-types'


export default {

  /*
  搜索的异步action
   */
  async search ({commit}, searchName) {

    // 更新状态数据(==>请求中)
    commit(REQUESTING)

    // 发搜索的异步ajax请求
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
      commit(REQ_SUCCESS, {users})
    } catch (error) {
      // 失败了, 更新状态数据(失败)
      commit(REQ_ERROR, {errorMsg: '请求错误!'})
    }
  }
}