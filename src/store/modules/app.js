const app = {
  state: {
    bg: ''
  },
  mutations: {
    TOGGLE_BG: (state, value) => {
      state.bg = value
    }
  },
  actions: {
    ToggleBG({ commit }, bg) {
      commit('TOGGLE_BG', bg)
    }
  }
}

export default app
