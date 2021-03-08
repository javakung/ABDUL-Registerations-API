<template>
  <v-container id="profile">
    <div v-if="$store.state.loading">
           <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
        </div>
        <div v-else>
        <v-avatar  v-if="$store.state.user.fo" color="teal" size="50">
        <img :src="$store.state.user.fo" />
      </v-avatar>

      {{ $store.state.user.ff }}
      <v-btn v-if="$store.state.user.yo"
      depressed
      color="error"
     href="/"
    >
     <GoogleLogin
        :params="params"
        :logoutButton="true"
        :style="{
          border: `0`,
          backgroundColor: `rgb(0,0,0,0)`,
        }"
        >Logout</GoogleLogin
      >
    </v-btn>
     <span v-else>
     
     
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onCurrentUser="onCurrentUser"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
        :logoutButton="false"
        >texto</GoogleLogin
      >
</span>
        </div>
  </v-container>
</template>

<script>
import GoogleLogin from "vue-google-login";

export default {
  data: () => ({
    //
    params: {
      client_id: "1042372769466-ctqeoo0isdkbt1pethp8no473sejgl7h.apps.googleusercontent.com",
    },
    // only needed if you want to render the button with the google ui
    renderParams: {
      width: 230,
      height: 40,
      longtitle: true,
    },
  }),
  components: {
    GoogleLogin,
  },
   methods: {
    onSuccess(googleUser) {
      var Profile = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
      let payload = {
        Name: Profile.getName(),
        Email: Profile.getEmail(),
        Image: Profile.getImageUrl(),
        Token: id_token,
      };
      this.$store.dispatch("getLogin", payload);
    },
    onCurrentUser(googleUser) {
      var current = googleUser.getBasicProfile();
      var id_token = googleUser.getAuthResponse().id_token;
      let payload = {
        Name: current.getName(),
        Email: current.getEmail(),
        Image: current.getImageUrl(),
        Token: id_token,
      };
      this.$store.dispatch("getLogin", payload);
    },
    onFailure(err) {
      console.log(err);
    },
  },
 
};
</script>

<style>

.v-toolbar__content .v-toolbar__items #profile{
  padding: 0;
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 800px){
.v-toolbar__content .v-toolbar__items  #profile{
    display: none;
  }
}
</style>
