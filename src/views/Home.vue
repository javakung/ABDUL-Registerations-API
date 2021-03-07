<template>
   <div class="home">
     
  
   
  
       
       
   
     <servicelist :length="($store.state.lengthPageP / 10) + 1"></servicelist>
   
  



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