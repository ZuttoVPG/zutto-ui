import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.http.options = {
  root: '/api',
  credentials: true,
  xhr: {
    withCredentials: true
  }
}

export default {
  user: Vue.resource('user{/id}'),

  stats () {
    return Vue.http.get('stats')
  },

  auth: {
    login (credentials) {
      return Vue.http.post('auth/login', credentials)
    },

    logoff () {
      return Vue.http.post('auth/logout')
    },

    signup (newUser) {
      return Vue.http.post('auth/signup')
    }
  }
}
