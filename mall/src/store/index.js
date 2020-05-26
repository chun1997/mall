import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count += 1
    },
    addCart(state, payload) {
      payload.count = 1
      payload.checked = true
      state.cartList.push(payload)
    }
    // addToCart(state, payload) {
    //   let oldProduct = state.cartList.find(item => item.iid == payload.iid)
    //   if (oldProduct) {
    //     oldProduct.count++
    //   } else {
    //     payload.count = 1
    //     state.cartList.push(payload)
    //     console.log(state.cartList);

    //   }
    // }
  },
  actions: {
    addToCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid == payload.iid)
        if (oldProduct) {
          context.commit('addCount', oldProduct)
          resolve('当前商品数量+1')
        } else {
          context.commit('addCart', payload)
          resolve('添加商品成功')
        }
      })
    }
  },
  modules: {
  }
})
