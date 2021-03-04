<template>
   <div class="home">
     
  <v-parallax src="@/assets/What Space Really Looks Like.jpg" alt="" height="100%">
   
  
       
       
     <v-container>
     <servicelist></servicelist>
     </v-container>
  

 </v-parallax>
   
    
  </div>
</template>

<script>
import Servicelist from '../components/Servicelist.vue'
export default {
  components: { Servicelist },
  data: () => ({
    //
   
  }),

}
</script>

<style>

</style>