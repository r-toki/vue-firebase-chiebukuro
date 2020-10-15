import * as fb from '../../common/firebase.config'

const state = { currentUser: null, loggedIn: null }

const getters = {
  currentUser(state) {
    return state.currentUser
  },
  loggedIn(state) {
    return state.loggedIn
  }
}

const actions = {
  cbOnAuthStateChanged(context, user) {
    if (user) {
      context.commit('SET_LOGGED_IN', true)
      fb.usersCollection
        .doc(user.uid)
        .get()
        .then(user => {
          context.commit('SET_CURRENT_USER', {
            id: user.id,
            ref: user.ref,
            ...user.data()
          })
        })
    } else {
      context.commit('SET_LOGGED_IN', false)
      context.commit('SET_CURRENT_USER', null)
    }
  }
}

const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  },
  SET_LOGGED_IN(state, loggedIn) {
    state.loggedIn = loggedIn
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
