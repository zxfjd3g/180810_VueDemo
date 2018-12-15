/*
入口JS
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'

// 注册全局组件(决定标签名, 所有组件中都可以直接使用)
Vue.component(Button.name, Button)   // name: mt-button

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})