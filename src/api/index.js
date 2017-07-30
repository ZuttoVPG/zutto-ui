import Vue from 'vue'
import store from '../stores'
import VueResource from 'vue-resource'
import handlers from './handlers'
import jwtDecode from 'jwt-decode'

Vue.use(VueResource)

Vue.http.options = {
  root: '/api'
}

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + store.state.authToken)

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
      return Vue.http.post('oauth/token', {
        grant_type: 'password',
        client_id: '1',
        client_secret: '6vsytKHOZbVqDuexJUyS5j0GZhAvRpaQyIfKPFvI',
        scope: '*',
        username: credentials.username,
        password: credentials.password
      })
    },

    signup (user) {
      return Vue.http.put('user', user)
    },

    logoff () {
      var tokenId = ''
      if (store.state.authToken !== '') {
        tokenId = jwtDecode(store.state.authToken).jti
      }

      return Vue.http.delete('oauth/tokens/' + tokenId)
    }
  }
}
