import request from '@/utils/request'
import { trim } from '@/utils'
const user = {
  state: {
    userid: sessionStorage.getItem('UID') || '',
    token: sessionStorage.getItem('TOKEN') || '',
  },
  mutations: {
    SET_USERID: (state, userid) => {
      state.userid = userid
      sessionStorage.setItem('UID', userid)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('TOKEN', token)
    }
  },
  actions: {
    // 用户名登录
    Login({ commit }, userInfo) {
      const username = trim(userInfo.username)
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        request.post('/login', { username, password }, function(response) {
          if (response.success) {
            const dataS = response.data
            commit('SET_USERID', dataS.userId)
            commit('SET_TOKEN', dataS.jwtToken)
          }
          resolve(response)
        }, function(error){
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        request.post('/loginout', { }, function(response) {
          commit('SET_USERID', '')
          commit('SET_TOKEN', '')
          resolve(response)
        }, function(error){
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USERID', '')
        commit('SET_TOKEN', '')
        resolve()
      })
    }
  }
}

export default user
