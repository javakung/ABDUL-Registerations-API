<template>
   <div class="home">
     
  <v-parallax src="@/assets/What Space Really Looks Like.jpg" alt="" height="100%">
   
     <v-container >
    <v-row >
      <v-col>
        <h1>Public API </h1>
      </v-col>
     <v-col 
        align-end
        sm="3"
        class="mt-5"
        >
       
        <v-select
          :items="sorts"
            v-model="Sort"
          label="Sort"
         dark
        ></v-select>  
        
        </v-col>
        </v-row>
  </v-container>
       
       
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
    Sort: -1
    ,
      sorts: [
        {value: -1 , text:'Latest'},
        {value: 1 , text:'Oldest'}
      ]
  }),

}
</script>

<style>

</style>