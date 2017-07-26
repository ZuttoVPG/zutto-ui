import store from '../stores'

export default {
  notAuthorized (response) {
    console.log('Got a Not Authorized error, resetting session.')
    store.commit('LOGOFF', {})
    // @TODO something to indicate logout in the UI
  },

  internalServerError (response) {
    console.log('Got an Internal Server Error')
    console.log(response.body)
  }
}
