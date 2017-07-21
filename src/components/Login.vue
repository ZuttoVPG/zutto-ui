<template>
  <div class="login">
    <h1>Login</h1>
    <div class='row'>
      <div class='col-sm-7'>
        <div class='form-group row'>
          <label for='username' class='col-sm-2 col-form-label'>Username</label>
          <div class='col-sm-6'>
            <input type='text' class='form-control' name='username' v-model="credentials.username" placeholder='Enter username'>
          </div>
        </div>
        <div class='form-group row'>
          <label for='password' class='col-sm-2 col-form-label'>Password</label>
          <div class='col-sm-6'>
            <input type='password' class='form-control' name='password' v-model="credentials.password"> 
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
import {API} from '../api/api'

export default {
  name: 'home',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    return this.$store.dispatch('FETCH_STATS')
  },
  methods: {
    login () {
      API.post('/auth/login', this.credentials).then(items => this.$store.commit('SET_AUTH_USER', {items}))
      // return this.$store.dispatch('AUTH_USER', this.credentials)
    }
  }
}
</script>
