import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    isStatus:0,
    count:0,
    userInfo:{},
    realTimeInfo:{},
  },
  mutations: {
    updateUserInfo (state,data) {
      state.userInfo = data
    },
    updaterealTime (state,data) {
      state.realTimeInfo = data
    }
  },
  actions: {
    updateUserInfo ({commit},data) {
      commit('updateUserInfo',data)
    },
    updaterealTime ({commit},data) {
      commit('updaterealTime',data)
    }
  }

})
export default store