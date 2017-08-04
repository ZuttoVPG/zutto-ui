<template>
  <div id="app">
		<nav class="navbar navbar-toggleable-md navbar-inverse bg-primary">
			<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
			<a class="navbar-brand" href="#">Zutto Zutto Zutto</a>
		</nav>

		<nav class="navbar navbar-toggleable-md navbar bg-inverse navbar-secondary">
			<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse justify-content-between">
        <ul class="nav" role="navigation">
          <li class="nav-item active">
            <router-link :to="'/'" class='nav-link'>Home</router-link> <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/inventory/'" class='nav-link'>Inventory</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/pet/'" class='nav-link'>Pets</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/forum/'" class='nav-link'>Forum</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Help</a>
          </li>
        </ul>
      
        <ul class='nav navbar-user ml-auto' v-show="authUser == false">
          <li class='nav-item'>
            <router-link :to="'/signup'" class='nav-link'>Sign Up</router-link>
          </li>
          <li class='nav-item'>
            <router-link :to="'/login'" class='nav-link'>Login</router-link>
          </li>
        </ul>
        <ul class='nav navbar-user ml-auto' v-show="authUser != false">
          <li class='nav-item dropdown'>
            <a href='#' class='nav-link dropdown-toggle' data-toggle='dropdown' aria-expanded="false">{{ authUser.username }}</a>
            <div class="dropdown-menu">
              <router-link :to="'/user/' + authUser.id" class='nav-link'>Profile</router-link>
              <router-link :to="'/user/'" class='nav-link'>Settings</router-link>
              <a href='#' class='nav-link' @click="logout()">Logout</a>
            </div>
          </li>
        </ul>
      </div>

		</nav>

    <div id='main-content'>
      <zutto-view v-bind:is403="false"></zutto-view>
    </div>

    <!-- Footer -->
    <br clear='both'>
    <footer class='hidden-xs footer'>
      <div class='container-fluid'>
        <div class='row justify-content-between'>
          <ul class="nav">
            <li class='nav-item'><a href='#' class='nav-link'>Contact</a></li>
            <li class='nav-item'><a href='#' class='nav-link'>Terms of Use</a></li>
            <li class='nav-item'><a href='#' class='nav-link'>Privacy Policy</a></li>
          </ul>

          <p class='text-center'>Copyright &copy; Yasashii Syndicate 2017.</p>

          <ul class='nav'>
            <li class='nav-item'><a href="#top" class='nav-link'>Back to top</a></li>
            <li class='nav-item'><a href='https://twitter.com/ZuttoVPG' class='nav-link'>Twitter</a></li>
            <li class='nav-item'><a href="https://github.com/owlmanatt/zuttozuttozutto" class='nav-link'>Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
    <!-- End Footer -->
  </div>
</template>

<script>
import ZuttoView from '@/components/ZuttoView'
require('./assets/yshi-bootstrap/app.js')
require('vue-recaptcha/dist/vue-recaptcha.min.js')

export default {
  name: 'app',
  components: {
    'zutto-view': ZuttoView
  },
  computed: {
    authUser () {
      return this.$store.state.authUser
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('END_SESSION', {})
      this.$router.push('/')
    }
  },
  created () {
    // return this.$store.dispatch('FETCH_AUTH_USER')
  }
}
</script>

<style>
  @import './assets/yshi-bootstrap/app.css';
</style>
