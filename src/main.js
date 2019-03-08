import 'babel-polyfill'
import Vue from 'vue'

import '../theme/index.css'
import ElementUI from 'element-ui'

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
