/*
入口JS
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App2.vue'

// 声明使用vue插件
Vue.use(VueResource) // 内部给vm/所有组件对象添加了一个能发ajax请求的属性: $http.get()/post()


new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})