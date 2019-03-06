import request from '@/utils/request'
import { trim } from '@/utils'

const user = {
  state: {
    userid: sessionStorage.getItem('UID') || '',
    name: sessionStorage.getItem('UNAME') || ''
  },
  mutations: {
    SET_USERID: (state, userid) => {
      state.userid = userid
      sessionStorage.setItem('UID', userid)
    },
    SET_NAME: (state, name) => {
      state.name = name
      sessionStorage.setItem('UNAME', name)
    }
  },
  actions: {
    // 用户名登录
    Login({ commit }, userInfo) {
      const mobile = trim(userInfo.username)
      const password = userInfo.password
      const role = userInfo.role
      return new Promise((resolve, reject) => {
        request.post('/sm/login.do', { mobile, password, role }, function(response) {
          if (response.meta.state === '000000') {
            if (response.data) {
              const dataS = response.data
              commit('SET_NAME', dataS.name)
              commit('SET_USERID', dataS.id)
            }
          }
          resolve(response)
        }, function(error) {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.post('/sm/logout.do', { }, function(response) {
          if (response.meta.state === '000000') {
            commit('SET_NAME', '')
            commit('SET_USERID', '')
          }
          resolve(response)
        }, function(error) {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_NAME', '')
        commit('SET_USERID', '')
        resolve()
      })
    }
  }
}

export default user
