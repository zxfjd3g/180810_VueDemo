/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../views/About.vue'
import Home from '../views/Home.vue'

// 声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({ // 配置对象
  mode: 'history', // 去掉路由路径中的#
  // 配置应用中所有路由
  routes: [
    {
      path: '/about',
      component: About
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
})