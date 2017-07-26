import Vue from 'vue'
import store from '../stores'
import VueResource from 'vue-resource'
import handlers from './handlers'

Vue.use(VueResource)

Vue.http.options = {
  root: '/api'
}

Vue.http.interceptors.push(function (request, next) {
  console.log(store.state.authToken)
  request.headers.set('Authorization', JSON.stringify(store.state.authToken))

  next(function (response) {
    if (response.status === 401) {
      return handlers.notAuthorized(response)
    }

    if (response.status === 500) {
      return handlers.internalServerError(response)
    }
  })
})

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
