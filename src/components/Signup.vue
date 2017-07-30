<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <div class='row' v-if="generalErrors.length > 0">
      <div class="alert alert-danger" role="alert">
        <span v-for="error in generalErrors">{{ error }}</span>
      </div>
    </div>


    <form v-on:submit.prevent="validate()">
      <div class='row'>
        <div class='col-sm-7'>

          <div class='form-group row'> 
            <label for='username' class='col-sm-2 col-form-label'>Username</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="username">
                <template slot="form-field" scope="validator">
                  <input type='text' class='form-control' name='username' v-model="signup.username" :class="validator.iconClass" v-validate="'required|max:32'">
                </template>
              </field-validation>
            </div>
          </div>

          <div class='form-group row'> 
            <label for='email' class='col-sm-2 col-form-label'>Email Address</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="email">
                <template slot="form-field" scope="validator">
                  <input type='email' class='form-control' name='email' v-model="signup.email" :class="validator.iconClass" v-validate="'required|email|max:255'">
                </template>
              </field-validation>
            </div>
          </div>

          <div class='form-group row'>
            <label for='password' class='col-sm-2 col-form-label'>Password</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="password">
                <template slot="form-field" scope="validator">
                  <input type='password' class='form-control' name='password' v-model="signup.password" :class="validator.iconClass" v-validate="'required|min:8'"> 
                </template>
              </field-validation>
            </div>
          </div>

          <div class='form-group row'>
            <label for='passwordConfirm' class='col-sm-2 col-form-label'>Confirm Password</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="passwordConfirm">
                <template slot="form-field" scope="validator">
                  <input type='password' class='form-control' name='passwordConfirm' v-model="signup.passwordConfirm" :class="validator.iconClass" v-validate="'required|min:8|confirmed:password'"> 
                </template>
              </field-validation>
            </div>
          </div>

          <div class='form-group row'>
            <label for='birthDate' class='col-sm-2 col-form-label'>Birth Date</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="birthDate">
                <template slot="form-field" scope="validator">
                  <input type='date' class='form-control' name='birthDate' v-model="signup.birthDate" :class="validator.iconClass" v-validate="'required|date_format:YYYY-MM-DD'">
                </template>
              </field-validation>
            </div>
          </div>

          <div class='form-group row'>
            <label for='tosAccept' class='col-sm-2 col-form-label'>Agree to Terms of Service</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="tosAccept">
                <template slot="form-field" scope="validator">
                  <input type='checkbox' class='form-control form-check-input' name='tosAccept' v-model="signup.tosAccept" :class="validator.iconClass" v-validate="'required'"> 
                </template>
              </field-validation>
            </div>
          </div>

          <div class="form-group row">
            <div class='offset-sm-2 sm-col-6'>
              <button type='submit' class='btn btn-primary'>Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import zutto from '../api'

export default {
  name: 'signup',
  data () {
    return {
      fieldErrors: {},
      generalErrors: [],
      signup: {
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        birthDate: '',
        tosAccept: ''
      }
    }
  },
  methods: {
    register () {
      this.fieldErrors = {}
      this.generalErrors = []
      zutto.auth.signup(this.signup).then(
        (items) => {
          zutto.auth.login({
            username: this.signup.username,
            password: this.signup.password
          }).then(
            (items) => {
              var token = items.data.access_token
              this.$store.commit('SET_TOKEN', { token })
              this.$store.dispatch('FETCH_AUTH_USER')
              this.$router.push('/')
            },
            (resp) => {
              this.fieldErrors = resp.data.errors.fields
              this.generalErrors = resp.data.errors.form
            }
          )
        },
        (resp) => {
          this.fieldErrors = resp.data.errors.fields
          this.generalErrors = resp.data.errors.form
        }
      )
    },

    validate () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return
        }

        this.register()
      })
    }
  }
}
</script>
