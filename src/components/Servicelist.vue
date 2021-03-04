<template>
  <v-container>
  <div class="text-center" v-if="$store.state.loading">
    
      <v-progress-circular
      
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
 
  </div>
  <div v-else>
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
         v-on:change="showService"
        ></v-select>  
        
        </v-col>
        </v-row>
  <v-card
    class="mx-auto mt-5 "
    max-width="800"
    outlined
     elevation="12"
    v-for="service in $store.state.servicelist[0]" :key="service.id"
  >
    <v-list-item three-line >
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ service.am }}
        </v-list-item-title>
        <v-list-item-subtitle class="mb-3"> {{ service.fh }}  </v-list-item-subtitle>
            <v-divider inset></v-divider>
        <v-list-item-content>
            {{ service.sy }}
        </v-list-item-content>
      </v-list-item-content>

    
    </v-list-item>

    <v-card-actions>
      
        <v-expansion-panels accordion >
      <v-expansion-panel  class="mb-5">
        <v-expansion-panel-header>Details</v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-simple-table
    fixed-header
    height="200px"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Parameter
          </th>
          <th class="text-left">
            Type
          </th>
            <th class="text-left">
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
           v-for="(parameter, index) in service.oa"
                    :key="`paramName-${index}`"
        >
          <td>{{ parameter.om }}</td>
          <td>{{ parameter.oy }}</td>
          <td>{{ parameter.sv }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      
    </v-expansion-panels>
    
              
    </v-card-actions>
  </v-card>
  
  <v-pagination
  class="mt-5"
      v-model="page"
      :length=" ($store.state.servicelist[1].total / 10)+1"
      :total-visible="10"
      circle
    ></v-pagination>
  </div>
  </v-container>
</template>

<script>
export default {
 data: () => ({
    //
   page : 1,
    Sort: -1
    ,
      sorts: [
        {value: -1 , text:'Latest'},
        {value: 1 , text:'Oldest'}
      ]
  }),
  mounted(){
     let params = {
            page : this.page,
            sort : this.Sort
          }
      this.$store.dispatch('getService',params)

  } ,
  methods:{
      showService(){
          let params = {
            page : this.page,
            sort : this.Sort
          }
        this.$store.dispatch('getService', params)
      }
  },
  watch: {
    page: function(val) {
      let params = {
        page: this.page,
        sort: this.Sort,
      };
      if (val > 0) {
        this.$store.dispatch("getService", params);
      }
    },
  },
      
}
</script>

<style>

</style>