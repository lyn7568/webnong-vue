import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json; charser=UTF-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  config.data = qs.stringify(config.data, { indices: false })
  // if (config.method === 'post') {
  //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // }

  if (store.getters.token) {
    config.headers.Authorization = `token ${store.getters.token}`
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  let taR = response.data
  if (response && response.status === 200) {
    if (response.data === undefined) { // 解决IE9数据问题
      taR = response.request.responseText
    } else {
      taR = response.data
    }
    if (!(taR instanceof Object)) { // 判断taR不是Object时，解析成Object
      taR = JSON.parse(taR)
    }
    if (!taR.success) {
      Message.error(taR.msg)
    }
    if (!taR.success && (taR.code === 103 || taR.code === 201 || taR.code === 205 || taR.code === 206 || taR.code === 207)) {
      store.dispatch('FedLogOut').then(() => {
        router.replace({ path: '/login' })
      })
    }
    return taR
  } else {
    return Promise.resolve(response)
  }
}, error => {
  return Promise.reject(error)
})

var ret = {
  get: function(url, Da, sh, eh) {
    service({
      method: 'get',
      url: url,
      params: Da
    }).then(res => {
      sh(res)
    }).catch(err => {
      if (eh) eh(err)
    })
  },
  post: function(url, Da, sh, eh) {
    service({
      method: 'post',
      url: url,
      data: Da
    }).then(res => {
      sh(res)
    }).catch(err => {
      if (eh) eh(err)
    })
  }
}

export default ret
