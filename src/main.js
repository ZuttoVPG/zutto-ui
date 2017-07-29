// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import fieldValidation from './components/forms/Validation'
import App from './App'
import store from './stores'
import router from './router'

Vue.config.productionTip = false
Vue.component('field-validation', fieldValidation)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
