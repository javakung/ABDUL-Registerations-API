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
      v-model="email"
      :error-messages="emailErrors"
      label="Endpoint"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
     <v-row align="center">
 <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
     <v-select
     v-model="select"
     :error-messages="selectErrors"
          :items="items"
          label="Permission"
          dense
          outlined
            required
      @change="$v.select.$touch()"
      @blur="$v.select.$touch()"

        ></v-select>
 </v-col>
  <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
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
   

    <v-btn
      class="mr-4"
       elevation="8"
  raised
  color="primary"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn 
        elevation="8"
      raised
    @click="clear">
      clear
    </v-btn>
  </form>

</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, url } from 'vuelidate/lib/validators'


  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(20) },
      email: { required, url },
      select: { required },
      methods: { required }
    },

    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Public',
        'Private',

      ],
      checkbox: false,
      methods: null,
      method: [
          'GET',
          'POST'
      ]
    }),

    computed: {
        methodsErrors () {
        const errors = []
        if (!this.$v.methods.$dirty) return errors
        !this.$v.methods.required && errors.push('Method is required')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Permission is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.url && errors.push('Must be valid url')
        !this.$v.email.required && errors.push('Url is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.methods = null
      },
    },
  }
</script>

<style>

</style>