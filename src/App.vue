<template>
  <v-app>
    <v-app-bar app color="deep-purple" dark>
      <v-toolbar-title><h2>ABDUL Registerations API</h2></v-toolbar-title>

      <v-spacer></v-spacer>
      
  
      <v-toolbar-items right>
        
      <google></google>
     
</v-toolbar-items>
      <v-app-bar-nav-icon @click="drawer = true" right></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list nav shaped dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/MyAPI">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My API</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Google from "./components/SignIn/Google.vue";

export default {
  components: { Google },
  name: "App",
  data: () => ({
    //
    drawer: false,
    group: null,
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@700&family=Roboto&display=swap");

.v-application {
  font-family: "Oxygen", sans-serif !important;
  font-family: "Roboto", sans-serif !important;
}

</style>
