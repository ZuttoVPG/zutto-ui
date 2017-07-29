<template>
  <div class="login">
    <h1>Login</h1>
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
                  <input type='text' class='form-control' name='username' v-model="credentials.username" v-validate="'required'" :class="validator.iconClass">
                </template>
              </field-validation>
            </div>
          </div>
    
          <div class='form-group row'>
            <label for='password' class='col-sm-2 col-form-label'>Password</label>
            <div class='col-sm-6'>
              <field-validation :status="errors" :customErrors="fieldErrors" field="password">
                <template slot="form-field" scope="validator">
                  <input type='password' class='form-control' name='password' v-model="credentials.password" v-validate="'required'" :class="validator.iconClass"> 
                </template>
              </field-validation>
              <small class='form-text text-muted'>If you have forgotten your password, <a href='#'>click here to reset it</a>.</small>
            </div>
          </div>
          
          <div class="form-group row">
            <div class='offset-sm-2 sm-col-6'>
              <button type='submit' class='btn btn-primary'>Login</button>
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
  name: 'login',
  data () {
    return {
      fieldErrors: {},
      generalErrors: [],
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.fieldErrors = {}
      this.generalErrors = []

      zutto.auth.login(this.credentials).then(
        (items) => {
          this.$store.commit('SET_AUTH_USER', { items })
          this.$router.push('/')
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

        this.login()
      })
    }
  }
}
</script>
