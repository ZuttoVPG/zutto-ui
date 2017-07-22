import Vue from 'vue'
import Vuex from 'vuex'
import {STORAGE_KEY, state} from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [
    (store) => {
      store.subscribe((mutation, { state }) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store.state))
      })
    }
  ]
})
