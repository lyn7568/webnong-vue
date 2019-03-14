import axios from 'axios'
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
      const mobile = trim(userInfo.username)
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        axios.get('/static/json/login.txt?t='+new Date().getTime(), { mobile, password }).then(response => {
          console.log(response)
          if (response.data) {
            const dataS = response
            commit('SET_USERID', dataS.UserID)
            commit('SET_TOKEN', dataS.token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios.post('/sm/logout.do', { }).then(response => {
          if (response.meta.state === '000000') {
            commit('SET_USERID', '')
            commit('SET_TOKEN', '')
          }
          resolve(response)
        }).catch(error => {
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
