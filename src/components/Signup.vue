<template>
  <div class="signup">
    <h1>Sign Up</h1>
    <div class='row' v-if="errors.form.length > 0">
      <div class="alert alert-danger" role="alert">{{ errors.form }}</div>
    </div>
    <div class='row'>
      <div class='col-sm-7'>

        <div class='form-group row' :class="{ 'has-danger': errors.fields.username }"> 
          <label for='username' class='col-sm-2 col-form-label'>Username</label>
          <div class='col-sm-6'>
            <input type='text' class='form-control' name='username' v-model="signup.username">
            <div class="form-control-feedback" v-show="errors.fields.username">
              {{ errors.fields.username }} 
            </div>
          </div>
        </div>

        <div class='form-group row' :class="{ 'has-danger': errors.fields.email }"> 
          <label for='email' class='col-sm-2 col-form-label'>Email Address</label>
          <div class='col-sm-6'>
            <input type='email' class='form-control' name='email' v-model="signup.email">
            <div class="form-control-feedback" v-show="errors.fields.email">
              {{ errors.fields.email}} 
            </div>
          </div>
        </div>

        <div class='form-group row' :class="{ 'has-danger': errors.fields.password }">
          <label for='password' class='col-sm-2 col-form-label'>Password</label>
          <div class='col-sm-6'>
            <input type='password' class='form-control' name='password' v-model="signup.password"> 
            <div class="form-control-feedback" v-show="errors.fields.password">
              {{ errors.fields.password }} 
            </div>
          </div>
        </div>

        <div class='form-group row' :class="{ 'has-danger': errors.fields.passwordConfirm }">
          <label for='passwordConfirm' class='col-sm-2 col-form-label'>Confirm Password</label>
          <div class='col-sm-6'>
            <input type='password' class='form-control' name='passwordConfirm' v-model="signup.passwordConfirm"> 
            <div class="form-control-feedback" v-show="errors.fields.passwordConfirm">
              {{ errors.fields.passwordConfirm }} 
            </div>
          </div>
        </div>

        <div class='form-group row' :class="{ 'has-danger': errors.fields.birthDate}">
          <label for='birthDate' class='col-sm-2 col-form-label'>Birth Date</label>
          <div class='col-sm-6'>
            <input type='date' class='form-control' name='birthDate' v-model="signup.birthDate"> 
            <div class="form-control-feedback" v-show="errors.fields.birthDate">
              {{ errors.fields.birthDate}} 
            </div>
          </div>
        </div>

        <div class='form-group row' :class="{ 'has-danger': errors.fields.tosAccept}">
          <label for='tosAccept' class='col-sm-2 col-form-label'>Agree to Terms of Service</label>
          <div class='col-sm-6'>
            <input type='checkbox' class='form-control form-check-input' name='tosAccept' v-model="signup.tosAccept"> 
            <div class="form-control-feedback" v-show="errors.fields.tosAccept">
              {{ errors.fields.tosAccept }} 
            </div>
          </div>
        </div>


        <div class="form-group row">
          <div class='offset-sm-2 sm-col-6'>
            <button type='submit' class='btn btn-primary' @click="submitSignup()">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zutto from '../api'

export default {
  name: 'signup',
  data () {
    return {
      errors: {
        fields: {},
        form: []
      },
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
    submitSignup () {
      if (this.signup.passwordConfirm.length < 8) {
        this.errors.fields.passwordConfirm = 'Password must be 8 characters'
        return
      }

      if (this.signup.password !== this.signup.passwordConfirm) {
        this.errors.fields.passwordConfirm = 'Passwords must match'
        return
      }

      this.errors.fields = {}
      this.errors.form = []
      zutto.auth.signup(this.signup).then(
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
