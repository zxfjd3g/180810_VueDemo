/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Messages from '../views/Messages.vue'
import Message from '../views/Message.vue'

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
      component: Home,
      children: [ // 注册所有子路由
        {
          path: '/home/news', // 路径左侧的/永远代表项目根路径
          component: News
        },
        {
          path: 'messages',
          component: Messages,
          children: [
            {
              name: 'message',
              path: '/home/messages/:id',
              component: Message,
            }
          ]
        },

        {
          path: '',
          redirect: '/home/news'
        }
      ]
    },
    {
      path: '/',
      redirect: '/about'
    }
  ]
})