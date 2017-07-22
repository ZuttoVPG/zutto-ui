<template>
  <div class="login">
    <h1>Login</h1>
    <div class='row' v-if="errors.form.length > 0">
      <div class="alert alert-danger" role="alert">{{ errors.form }}</div>
    </div>
    <div class='row'>
      <div class='col-sm-7'>
        <div class='form-group row' :class="{ 'has-danger': errors.fields.username }"> 
          <label for='username' class='col-sm-2 col-form-label'>Username</label>
          <div class='col-sm-6'>
            <input type='text' class='form-control' name='username' v-model="credentials.username" placeholder='Enter username'>
            <div class="form-control-feedback" v-show="errors.fields.username">
              {{ errors.fields.username }} 
            </div>
          </div>
        </div>
        <div class='form-group row' :class="{ 'has-danger': errors.fields.password }">
          <label for='password' class='col-sm-2 col-form-label'>Password</label>
          <div class='col-sm-6'>
            <input type='password' class='form-control' name='password' v-model="credentials.password"> 
            <div class="form-control-feedback" v-show="errors.fields.password">
              {{ errors.fields.password }} 
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class='offset-sm-2 sm-col-6'>
            <button type='submit' class='btn btn-primary' @click="login()">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zutto from '../api'

export default {
  name: 'login',
  data () {
    return {
      errors: {
        fields: {},
        form: []
      },
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.errors.fields = {}
      this.errors.form = []
      zutto.auth.login(this.credentials).then(
        (items) => {
          this.$store.commit('SET_AUTH_USER', { items })
        },
        (resp) => {
          this.errors = resp.data.errors
        }
      )
    }
  }
}
</script>
