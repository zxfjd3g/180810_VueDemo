/*
入口JS
 */
import Vue from 'vue'
import store from './vuex/store'
import App from './App2.vue'



new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store
})