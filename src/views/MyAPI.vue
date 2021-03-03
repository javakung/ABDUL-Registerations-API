<template>

  <div class="MyApi">
     <v-parallax src="http://www.100hdwallpapers.com/wallpapers/1920x1080/comet_minimal-hd_wallpapers.jpg"> 
    <v-container >
       <v-card
          elevation="24"
          >
          <v-card-title>
            Register
          </v-card-title>
          <v-container class="pa-5">
      
    <service-reg></service-reg>
    </v-container>
       </v-card>
    </v-container>
     </v-parallax>
     <v-container>
     <h1>My API</h1>
     </v-container>
 <servicelist></servicelist>
  </div>

</template>

<script>
import Servicelist from '../components/Servicelist.vue'

import ServiceReg from '../components/ServiceReg.vue'
// @ is an alias to /src


export default {
  components: { ServiceReg, Servicelist},
  
 
}
</script>
