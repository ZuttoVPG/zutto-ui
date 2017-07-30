export const STORAGE_KEY = 'zutto'

var defaultState = {
  authToken: '',
  authUser: false,
  userProfiles: {},
  siteStats: {},
  pets: {}
}

export const state = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defaultState
