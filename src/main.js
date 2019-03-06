import 'babel-polyfill'
import Vue from 'vue'

import ElementUI from 'element-ui'
import '../theme/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

import request from './utils/request'
Vue.prototype.$http = request

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
