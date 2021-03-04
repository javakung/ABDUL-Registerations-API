import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    servicelist: [],
    user: [],
    loading: false,
    Myloading: false,
    Publicloading: false,
    statusAdd: [],
    serviceUser: [],
    deleteRequest: {},
    updateRequest: {}
  },
  mutations: {
    SET_USER(state, Login) {
      state.user = Login;
    },
    SET_SERVICE(state, listitems) {
      state.servicelist = listitems;
    },
    SET_ADDSTA(state, Addservice) {
      state.statusAdd = Addservice
    },
    SET_SERVICEUSER(state, listuser) {
      state.serviceUser = listuser
    },
    SET_DELETEREQUEST(state, request) {
      state.deleteRequest = request
    },
    SET_UPDATEREQUEST(state, request) {
      state.updateRequest = request
    }
  },
  actions: {
    getLogin({ commit }, payload) {
      this.state.loading = true;
      axios
        .post("https://restfulapipython.herokuapp.com/v1/APIs/login", payload)
        .then((res) => {
          commit("SET_USER", res.data[0].data);
          this.state.loading = false;
        });
    },
    getService({ commit }, params) {
      this.state.Publicloading = true
      axios
        .get("https://restfulapipython.herokuapp.com/v1/APIs/", { params })
        .then((res) => {
          commit("SET_SERVICE", res.data);
          this.state.Publicloading = false;
        });
    },
    postService({ commit }, payload) {
      axios
        .post(
          "https://restfulapipython.herokuapp.com/v1/APIs/service/add",
          payload
        )
        .then((res) => {
          // console.log(res.data);
          commit("SET_ADDSTA", res.data[0]);
        });
    },
    getServiceUser({ commit }, params) {
      this.state.Myloading = true
      axios
        .get("https://restfulapipython.herokuapp.com/v1/APIs/user", {params})
        .then((res) => {
          commit("SET_SERVICEUSER", res.data);
          this.state.Myloading = false
        });
    },
    deleteService({ commit }, payload) {
      commit("SET_DELETEREQUEST", payload);
      axios.delete(
        "https://restfulapipython.herokuapp.com/v1/APIs/service/delete"
        ,{
          data: {
            sid: this.state.deleteRequest.sid,
            u: this.state.deleteRequest.u
        }}
      ).then(res => {
        console.log(res.data)
      }
      )
    },
    updateService({ commit }, payload) {
      commit("SET_UPDATEREQUEST", payload);
      axios.patch(
        "https://restfulapipython.herokuapp.com/v1/APIs/service/update",
        this.state.updateRequest
      ).then(res => {
        console.log(res.data)
      })
    }
  },
  modules: {},
});
