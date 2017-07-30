export default {
  SET_STATS: (state, { items }) => {
    state.siteStats = items.data
  },

  SET_TOKEN: (state, { token }) => {
    state.authToken = token
  },

  SET_AUTH_USER: (state, { items }) => {
    state.authUser = items.data
  },

  LOGOFF: (state, { items }) => {
    state.authToken = ''
    state.authUser = false
  },

  SET_USER_PROFILE: (state, { items }) => {
    items = items.data
    var tmp = state.userProfiles
    tmp[items.id] = items

    state.userProfiles = tmp
  }
  /*
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) // false means user not found
  }
  */
}

