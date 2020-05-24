import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scroll: 0
  },
  mutations: {
    position(state, scrollTop) {
      state.scroll = scrollTop
    }
  },
  actions: {
  },
  modules: {
  }
})
