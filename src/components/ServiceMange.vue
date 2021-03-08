<template>
  <div>
    <v-parallax src="@/assets/Space3.jpg" alt="" height="100">
      <v-container>
        <v-row>
          <v-col class="mt-5">
            <h1>Manage API</h1>
          </v-col>
          <v-col align-end sm="3" class="mt-5">
            <v-select
              :items="sorts"
              v-model="Filter"
              label="Sort"
              dark
              v-on:change="showService"
            ></v-select>
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
        class=" mx-auto mt-5"
        max-width="800"
        outlined
        elevation="12"
        v-for="(service, index) in $store.state.serviceSuper[0]"
        :key="service.id"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              <v-text-field
                v-model="service.am"
                label="Service Name"
                filled
                rounded
                dense
                v-on:blur="update(service)"
              ></v-text-field>
            </v-list-item-title>
            <v-list-item-subtitle class="mb-3">
              Author : {{ service.fh }}
            </v-list-item-subtitle>
            <v-divider></v-divider>
            <v-list-item-content>
              <v-textarea
                v-model="service.sy"
                clearable
                clear-icon="mdi-close-circle"
                label="Description"
                value="This is clearable text."
                v-on:blur="update(service)"
              ></v-textarea>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-row>
            <v-col>
              <v-text-field
                v-model="service.wo"
                label="Endpoint"
                filled
                rounded
                dense
                v-on:blur="update(service)"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                class="ma-2"
                :loading="loading4"
                :disabled="loading4"
                color="info"
                v-on:click="checkConnection(service), (loader = 'loading4')"
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
            </v-col>
          </v-row>
        </v-card-actions>
        <v-card-actions>
          <v-expansion-panels accordion>
            <v-expansion-panel class="mb-5">
              <v-expansion-panel-header color="deep-purple" id="DeUser"
                >Details</v-expansion-panel-header
              >
              <v-expansion-panel-content class="mt-5">
                <v-form
                  v-for="(parameter, index) in service.oa"
                  :key="`paramName-${index}`"
                >
                  <v-row>
                    <v-col cols="7" sm="6" md="3">
                      <v-text-field
                        v-model="parameter.om"
                        label="Parameter Name"
                        outlined
                        v-on:blur="service"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3" sm="3">
                      <v-select
                        v-model="parameter.oy"
                        :items="paramType"
                        label="Type"
                        outlined
                        v-on:blur="update(service)"
                      ></v-select>
                    </v-col>
                    <v-col cols="10" md="6">
                      <v-textarea
                        outlined
                        v-model="parameter.sv"
                        rows="1"
                        label="Description"
                        v-on:blur="update(service)"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-fab-transition>
            <v-dialog
              v-model="dialog[index]"
              :retain-focus="false"
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="pink"
                  fab
                  dark
                  small
                  absolute
                  bottom
                  right
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  Are your sure to delete This service ?
                </v-card-title>
                <v-card-text>
                  <h-1>{{ service.am }}</h-1>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    v-on:click="dialog[index] = false"
                  >
                    No
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    v-on:click="deleteitem(service), (dialog[index] = false)"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-fab-transition>
        </v-card-actions>
      </v-card>

      <v-pagination
        class="mt-5 mb-5"
        v-model="page"
        :length="$store.state.lengthpage / 10 + 1"
        :total-visible="10"
        circle
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    //
    page: 1,
    Filter: -1,
    sorts: [
      { value: -1, text: "Latest" },
      { value: 1, text: "Oldest" },
    ],
    paramType: [
      { value: "Int", text: "Int" },
      { value: "Str", text: "Str" },
      { value: "Any", text: "Any" },
    ],
    dialog: {},
    loading: false,
    loading4: false,
  }),
  mounted() {
    let params = {
      page: this.page,
      user_id: this.$store.state.user.yo,
      sort: this.Filter,
      status: this.$store.state.user.ar,
    };
    if (this.$store.state.user.yo) {
      this.$store.dispatch("serviceSuper", params).then(
        (this.loading = true),
        setTimeout(() => {
          this.loading = false;
        }, 3000)
      );
    } else {
      setTimeout(() => {
        this.$store.dispatch("serviceSuper", params);
        this.loading = false;
      }, 1000);
    }
  },
  methods: {
    deleteitem(service) {
      let params = {
        sort: this.Filter,
        page: this.page,
        user_id: this.$store.state.user.yo,
        status: this.$store.state.user.ar,
      };
      let payload = {
        sid: service.ao,
        u: this.$store.state.user.yo,
        status: this.$store.state.user.ar,
      };

      this.$store.dispatch("serviceDeleteS", payload).then(
        (this.loading = true),
        setTimeout(() => {
          this.$store.dispatch("serviceSuper", params).then(
            setTimeout(() => {
              this.loading = false;
            }, 2500)
          );
        }, 3000)
      );
    },
    showService() {
      let params = {
        sort: this.Filter,
        page: this.page,
        user_id: this.$store.state.user.yo,
        status: this.$store.state.user.ar,
      };
      this.$store.dispatch("serviceSuper", params).then(
        (this.loading = true),
        setTimeout(() => {
          this.loading = false;
        }, 3000)
      );
    },
    update(service) {
      let payload = {
        sname: service.am,
        endpoint: service.wo,
        permiss: service.od,
        sid: service.ao,
        u: this.$store.state.user.yo,
        desc: service.sy,
        methods: service.ny,
        parameter: service.oa,
        status: this.$store.state.user.ar,
      };
      this.$store.dispatch("serviceUpdateS", payload);
    },
    checkConnection(service) {
      let payload = {
        url: service.wo,
        sid: service.ao,
      };
      this.$store.dispatch("urlValidate", payload).then(
        (this.loading4 = true),
        setTimeout(() => {
          this.loading4 = false;
        }, 1000)
      );
    },
  },
  watch: {
    page: function(val) {
      let params = {
        sort: this.Filter,
        page: this.page,
        user_id: this.$store.state.user.yo,
        status: this.$store.state.user.ar,
      };
      if (val > 0) {
        this.$store.dispatch("serviceSuper", params).then(
          (this.loading = true),
          setTimeout(() => {
            this.loading = false;
          }, 3000)
        );
      }
    },
      loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
};
</script>

<style>
#DeUser {
  color: white;
}

.v-btn--fab.v-size--small.v-btn--absolute.v-btn--bottom {
  bottom: 45%;
  right: -20px;
}
/* .v-card {
    position: relative;
}
.v-expansion-panels{
    position: absolute;
    bottom: 0;
} */

.v-pagination__item.v-pagination__item {
  outline: none;
}
</style>
