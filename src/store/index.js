import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

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
    updateRequest: {},
    serviceSuper: [],
    lengthpage: [],
    deleteSuper: {},
    updateSuper: {},
    lengthPageP: [],
    lengthPageU: [],
    urlval: "",
    check: [],
  },
  mutations: {
    SET_USER(state, Login) {
      state.user = Login;
    },
    SET_SERVICE(state, listitems) {
      state.servicelist = listitems;
    },
    SET_ADDSTA(state, Addservice) {
      state.statusAdd = Addservice;
    },
    SET_SERVICEUSER(state, listuser) {
      state.serviceUser = listuser;
    },
    SET_DELETEREQUEST(state, request) {
      state.deleteRequest = request;
    },
    SET_UPDATEREQUEST(state, request) {
      state.updateRequest = request;
    },
    SET_SERVICESUPER(state, listsuper) {
      state.serviceSuper = listsuper;
    },
    SET_LENGTHPAGE(state, number) {
      state.lengthpage = number;
    },
    SET_LENGTHPAGEP(state, number) {
      state.lengthPageP = number;
    },
    SET_LENGTHPAGEU(state, number) {
      state.lengthPageU = number;
    },
    SET_DELETESUPER(state, request) {
      state.deleteSuper = request;
    },
    SET_UPDATESUPER(state, request) {
      state.updateSuper = request;
    },
    SET_URLVAL(state, val) {
      state.urlval = val;
    },
    CHECK_STATE(state, data) {
      state.check = data;
    },
  },
  actions: {
    getLogin({ commit }, payload) {
      this.state.loading = true;
      axios
        .post(
          "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/login",
          payload
        )
        .then((res) => {
          commit("SET_USER", res.data[0].data);
          this.state.loading = false;
        });
    },
    getService({ commit }, params) {
      this.state.Publicloading = true;
      axios
        .get("https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/", {
          params,
        })
        .then((res) => {
          commit("SET_SERVICE", res.data);
          commit("SET_LENGTHPAGEP", res.data[1].total);
          this.state.Publicloading = false;
        });
    },
    postService({ commit }, payload) {
      axios
        .post(
          "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/service/add",
          payload
        )
        .then((res) => {
          // console.log(res.data);
          commit("SET_ADDSTA", res.data[0]);
        });
    },
    getServiceUser({ commit }, params) {
      // this.state.Myloading = true;
      axios
        .get("http://165.232.169.18/v1/APIs/user", {
          params,
        })
        .then((res) => {
          commit("SET_SERVICEUSER", res.data);
          commit("SET_LENGTHPAGEU", res.data[1].total);
          // this.state.Myloading = false;
        });
    },
    deleteService({ commit }, payload) {
      commit("SET_DELETEREQUEST", payload);
      axios
        .delete(
          "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/service/delete",
          {
            data: {
              sid: this.state.deleteRequest.sid,
              u: this.state.deleteRequest.u,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    },
    updateService({ commit }, payload) {
      commit("SET_UPDATEREQUEST", payload);
      this.state.Myloading = true;
      axios
        .patch(
          "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/service/update",
          this.state.updateRequest
        )
        .then((res) => {
          console.log(res.data);
          setTimeout(() => {
            this.state.Myloading = false;
          }, 3000);
        });
    },
    serviceSuper({ commit }, params) {
      axios.get("http://165.232.169.18/v1/APIs/admins", { params }).then((res) => {
        commit("SET_SERVICESUPER", res.data[0]);
        var fetch = res.data[0];
        commit("SET_LENGTHPAGE", fetch[1].total);
      });
    },
    serviceDeleteS({ commit }, payload) {
      commit("SET_DELETESUPER", payload);
      axios.delete(
        "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/admins/service/delete",
        {
          data: {
            sid: this.state.deleteSuper.sid,
            u: this.state.deleteSuper.u,
            status: this.state.deleteSuper.status,
          },
        }
      );
    },
    serviceUpdateS({ commit }, payload) {
      commit("SET_UPDATESUPER", payload);
      axios
        .patch(
          "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/admins/service/update",
          this.state.updateSuper
        )
        .then((res) => {
          console.log(res.data);
        });
    },
    urlValidate({ commit }, payload) {
      axios
        .post(
          "https://res-tful-python-yyab9.ondigitalocean.app/v1/APIs/urlval",
          payload
        )
        .then((res) => {
          commit("SET_URLVAL", res.data[1]);
        });
    },
    // Check({ commit }, params) {
    //   commit("CHECK_STATE",{params})
    // },
  },
  modules: {},
});
