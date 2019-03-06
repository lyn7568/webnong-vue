import axios from 'axios'
// import qs from 'qs'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  withCredentials: true // 表示跨域请求时是否需要使用凭证
})

// request拦截器
service.interceptors.request.use(config => {
  // 配置config
  config.headers.Accept = 'application/json'
  if (config.method === 'post') {
    // config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.headers['Content-Type'] = 'application/json'
  }
  // console.log(config)
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
    if (taR.meta.state === '000000') {
      return taR
    } else if (taR.meta.state === '100100') {
      Message.error(taR.meta.msg)
      store.dispatch('FedLogOut').then(() => {
        router.replace({ path: '/login' })
      })
    } else {
      Message.error(taR.data)
    }
  } else {
    return Promise.resolve(response)
  }
}, error => {
  return Promise.reject(error)
})

var ret = {
  post: function(url, data, sh) {
    service({
      method: 'post',
      url: url,
      data: data
    }).then(res => {
      sh(res)
    }).catch(err => {
      Message.error(err || '网络异常')
    })
  }
}

export default ret
