<template>
  <v-app>
    <v-app-bar app color="deep-purple" dark>
      <v-toolbar-title><p>ABDUL Registrations API</p></v-toolbar-title>

      <v-spacer></v-spacer>
      
  
      <v-toolbar-items right>
        
      <google></google>
     
</v-toolbar-items>
      <v-app-bar-nav-icon @click="drawer = true" right></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" fixed temporary  right>
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
          <v-list-item to="/MyAPI" v-if="$store.state.user.ff">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My API</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Manage" v-if="$store.state.user.ar == `superuser`">
            <v-list-item-icon>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Manage API</v-list-item-title>
          </v-list-item>
       
            <v-divider></v-divider>
            <v-container>
            
             <google></google>
           
             </v-container>
            
           
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

.v-application p {
    margin-bottom: 0; 
    font-size: 25px;
    font-weight:600
}

@media only screen and (min-width: 800px){
.v-item-group .container{
    display: none;
    align-items: center;

  }


}
</style>
