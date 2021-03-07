<template>

  <div class="MyApi">
      <v-parallax src="@/assets/Space1.jpg" alt="" height="1200"> 
        
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
   
      <service-user></service-user>
   
  </div>

</template>

<script>


import ServiceReg from '../components/ServiceReg.vue'
import ServiceUser from '../components/ServiceUser.vue'
// @ is an alias to /src


export default {
  components: { ServiceReg, ServiceUser},
  
 
}
</script>
