<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="20"
      label="Service Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="endpoint"
      :error-messages="emailErrors"
      label="Endpoint"
      required
      @input="$v.endpoint.$touch()"
      @blur="$v.endpoint.$touch()"
    ></v-text-field>
    <v-textarea
      v-model="descriptions"
      clearable
      clear-icon="mdi-close-circle"
      label="Description"
    ></v-textarea>
    <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="permission"
          :error-messages="selectErrors"
          :items="items"
          label="Permission"
          dense
          outlined
          required
          @change="$v.permission.$touch()"
          @blur="$v.permission.$touch()"
        ></v-select>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          v-model="methods"
          :error-messages="methodsErrors"
          :items="method"
          label="Method"
          dense
          outlined
          @change="$v.methods.$touch()"
          @blur="$v.methods.$touch()"
        ></v-select>
      </v-col>
    </v-row>
    <v-expansion-panels accordion>
      <v-expansion-panel class="mb-5">
        <v-expansion-panel-header
          color="deep-purple lighten-2
"
          >Parameter Set</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <div v-for="(input, k) in inputs" :key="k">
            <v-row class="ma-3">
              <v-col cols="7" sm="6" md="3">
                <v-text-field
                  v-model="input.paramN"
                  label="Parameter Name"
                ></v-text-field>
              </v-col>
              <v-col cols="4" md="3">
                <v-select
                  v-model="input.paramT"
                  :items="Titems"
                  menu-props="auto"
                  label="Type"
                  hide-details
                  single-line
                ></v-select>
              </v-col>
              <v-col cols="10" sm="6">
                <v-textarea
                  v-model="input.desc"
                  append-outer-icon="mdi-comment"
                  class="mx-2"
                  label="Description"
                  rows="1"
                ></v-textarea>
              </v-col>

              <v-row>
                <v-col align="end">
                  <v-btn
                    color="error"
                    @click="remove(k)"
                    v-show="k || (!k && inputs.length > 1)"
                    >Remove</v-btn
                  >

                  <v-btn
                    color="teal"
                    dark
                    @click="add(k)"
                    v-show="k == inputs.length - 1"
                    >Add</v-btn
                  >
                </v-col>
              </v-row>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-btn
      class="mr-4"
      elevation="8"
      raised
      color="primary"
      @click="addService"
    >
      submit
    </v-btn>
    <v-btn elevation="8" raised @click="clear">
      clear
    </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, url } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    endpoint: { required, url },
    permission: { required },
    methods: { required },
  },

  data: () => ({
    name: "",
    endpoint: "",
    permission: null,
    items: ["Public", "Private"],

    methods: null,
    method: ["GET", "POST"],
    inputs: [
      {
        paramN: "",
        paramT: "Int",
        desc: "",
      },
    ],
    Titems: [
      {
        value: "Int",
        text: "Int",
      },
      {
        value: "Str",
        text: "Str",
      },
      {
        value: "Any",
        text: "Any",
      },
    ],
    descriptions: "",
    page: 1,
    Filter: -1,
  }),

  computed: {
    methodsErrors() {
      const errors = [];
      if (!this.$v.methods.$dirty) return errors;
      !this.$v.methods.required && errors.push("Method is required");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.permission.$dirty) return errors;
      !this.$v.permission.required && errors.push("Permission is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.endpoint.$dirty) return errors;
      !this.$v.endpoint.url && errors.push("Must be valid url");
      !this.$v.endpoint.required && errors.push("Url is required");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.endpoint = "";
      this.permission = null;
      this.methods = null;
      this.descriptions = "";
    },
    add() {
      this.inputs.push({
        paramN: "",
        paramT: "",
      });
      // console.log(this.inputs);
    },
    remove(index) {
      this.inputs.splice(index, 1);
    },
    addService() {
      this.$v.$touch();

      let params = {
        page: this.page,
        sort: this.Filter,
        user_id: this.$store.state.user.yo,
      };

      let payload = {
        sname: this.name,
        endpoint: this.endpoint,
        desc: this.descriptions,
        permiss: this.permission,
        user: this.$store.state.user.yo,
        methods: this.methods,
        parameter: this.inputs,
      };
      this.$store
        .dispatch("postService", payload)
        .then(
            this.$store.dispatch("getServiceUser", params)
        )
        .then(
          setTimeout(() => {
            this.clear();
          }, 3000)
        );
    },
  },
};
</script>

<style></style>
