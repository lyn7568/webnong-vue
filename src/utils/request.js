import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true // 表示跨域请求时是否需要使用凭证
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers.Accept = 'application/json; charser=UTF-8'
  if (config.method === 'post') {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    // 处理后后台无需添加RequestBody
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
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
    // if (taR.code === 200) {
      return taR
    // }
    //  else if (taR.meta.state === '100100') {
    //   Message.error(taR.meta.msg)
    //   store.dispatch('FedLogOut').then(() => {
    //     router.replace({ path: '/login' })
    //   })
    // } else {
    //   Message.error(taR.data)
    // }
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
  },
  put: function(url, Da, sh, eh) {
    service({
      method: 'put',
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
