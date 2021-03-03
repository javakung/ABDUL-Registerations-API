import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    servicelist: [],
    user: [],
    loading: false
  },
  mutations: {
    SET_USER(state, Login) {
      state.user = Login
    },
    SET_SERVICE(state, listitems) {
      state.servicelist = listitems
    }
  },
  actions: {
    getLogin({ commit }, payload) {
      this.state.loading = true
      axios.post("https://restfulapipython.herokuapp.com/v1/APIs/login", payload).then(
        res => {
         
          commit('SET_USER', res.data[0].data)
           this.state.loading = false;
        }
      )
    }
    ,
    getService({ commit }) {
      let params = {
        page: 1,
        sort: -1
      }
      axios.get("https://restfulapipython.herokuapp.com/v1/APIs/", { params }).then(
        res => {

          commit('SET_SERVICE',res.data)
        }
      )
    }
    
  },
  modules: {
  }
})
