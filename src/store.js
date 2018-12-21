/*
vuex最核心的管理对象模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 声明使用vue插件
Vue.use(Vuex)

/*
包含n个状态数据
相当于data的对象
 */
const state = {
  count: 0 // 初始化状态
}

/*
包含n个直接更新状态数据的方法的对象
 */
const mutations = {
  INCREMENT (state) {
    state.count++
  },

  DECREMENT (state) {
    state.count--
  },
}

/*
包含n个间接更新状态数据的方法的对象
通过调用commit()触发对应的mutation函数调用来更新状态
 */
const actions = {
  increment ({commit}) {  // increment({commit方法})
    commit('INCREMENT')
  },

  decrement ({commit}) {
    commit('DECREMENT')
  },

  incrementIfOdd ({commit, state}) {
    if(state.count%2===1) {
      commit('INCREMENT')
    }

  },
  // 在action方法可以直接执行异步代码
  incrementAsync ({commit}) {  // increment({commit方法})
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  },
}

/*
包含所有基于state中的状态数据的getter计算属性方法的对象
 */
const getters = {
  evenOrOdd (state) {
    return state.count%2===1 ? '奇数' : '偶数'
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})