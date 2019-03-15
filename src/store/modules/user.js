import axios from 'axios'
import { trim } from '@/utils'
var HOST = process.env.BASE_API
var config = {
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  }
}
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
        axios.post(HOST + '/login', { username, password }, config).then(response => {
          if (response.success) {
            const dataS = response.data
            commit('SET_USERID', dataS.userId)
            commit('SET_TOKEN', dataS.jwtToken)
          }
          resolve(response)
        }). catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.post(HOST + '/loginout', { }, config).then(response => {
          commit('SET_USERID', '')
          commit('SET_TOKEN', '')
          resolve(response)
        }). catch(error => {
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
