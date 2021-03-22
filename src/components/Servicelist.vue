<template>
  <div>
    <v-parallax src="@/assets/Space4.jpg" alt="" height="100">
      <v-container>
        <v-row>
          <v-col class="mt-5">
            <h1>Public API</h1>
          </v-col>
          <p class="text-uppercase mt-3">filter</p>
          <v-col align-end sm="2">
           <v-radio-group
              v-model="Sort"
                 row
            >
            <v-radio
                label="Latest"
                color="red"
                :value='-1'
                dark
              ></v-radio>
                <v-radio
                label="Oldest"
                color="red"
                :value='1'
                dark
              ></v-radio>
           </v-radio-group>
           </v-col>
        
        </v-row>
      </v-container>
    </v-parallax>
    <div class="text-center mt-15" v-if="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-card
        class="mx-auto mt-5 "
        max-width="800"
        outlined
        elevation="12"
        v-for="service in $store.state.servicelist[0]"
        :key="service.id"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
             
                <v-row>
                  <v-col>
                    {{ service.am }}
                  </v-col>
                  <v-col align-end sm="1">
                    <v-icon right> mdi-earth </v-icon>
                  </v-col>
                </v-row>
      
            </v-list-item-title>
            <v-list-item-subtitle class="mb-3">
              {{ service.fh }}
            </v-list-item-subtitle>
            <v-divider></v-divider>
            <v-list-item-content>
              Description <v-divider vertical class="ml-3 mr-3"></v-divider>
              {{ service.sy }}
            </v-list-item-content>
            <v-divider></v-divider>
            <v-list-item-content>
              Endpoint <v-divider vertical class="ml-3 mr-3"></v-divider>
              {{ service.wo }}
            </v-list-item-content>
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            class="ma-2"
            :loading="loading4"
            :disabled="loading4"
            color="info"
            v-on:click="checkConnection(service), (loader[index] = 'loading4')"
          >
            Test Connection
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>
          <v-chip
            v-if="
              $store.state.urlval.status == `valid` &&
                $store.state.urlval.sid == service.ao
            "
            class="ma-2"
            color="green"
            outlined
          >
            Connected
          </v-chip>
          <v-chip
            v-else-if="
              $store.state.urlval.status == `invalid` &&
                $store.state.urlval.sid == service.ao
            "
            class="ma-2"
            color="red"
            outlined
          >
            Failed
          </v-chip>
          <v-chip v-else class="ma-2">
            Connection Status
          </v-chip>
        </v-card-actions>
        <v-card-actions>
          <v-expansion-panels accordion>
            <v-expansion-panel class="mb-5">
              <v-expansion-panel-header id="Pub1" color="purple darken-3"
                >Details
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table fixed-header height="200px">
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
        :length="length"
        :total-visible="10"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
  },
  data: () => ({
    //
    page: 1,
    Sort: -1,
    sorts: [
      { value: -1, text: "Latest" },
      { value: 1, text: "Oldest" },
    ],
    loading4: false,
    loading:false
  }),
  mounted() {
    this.showService()
  },
  methods: {
    showService() {
      let params = {
        page: this.page,
        sort: this.Sort,
      };
      this.loading4 = true
      this.$store.dispatch("getService", params).then(
        setTimeout(() => {
          this.loading4 = false
        }, 4500)
      )
    },
    checkConnection(service) {
      let payload = {
        url: service.wo,
        sid: service.ao,
      };
      this.$store.dispatch("urlValidate", payload).then(
        this.loading4= true,
        setTimeout(() => {
          
          this.loading4 = false;
        }, 1000)
      );
    },
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
    loader(index) {
      const l = this.loader[index];
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 1500);

      this.loader[index] = null;
    },
    Sort: function(val){
      let params = {
        page: this.page,
        sort: this.Sort,
      };
      if(val != null){
      this.$store.dispatch("getService", params).then(
        this.loading = true
      ).then(
        setTimeout(() => {
          this.loading = false
        }, 4500)
      )
      }
    }
  },
};
</script>

<style>
#Pub1 {
  color: white;
}
.v-pagination__item.v-pagination__item {
  outline: none;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
