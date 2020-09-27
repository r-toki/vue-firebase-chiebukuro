import firebase from '@/firebaseInit'

const state = {
  currentUser: {
    loggedIn: false,
    data: null
  }
}

const getters = {
  currentUser(state) {
    return state.currentUser
  }
}

const actions = {
  async signUp({ commit }, { email, password, displayName }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase
      .auth()
      .currentUser.updateProfile({ displayName: displayName })
    const currentUserData = { email, displayName }
    commit('SET_USER', { loggedIn: true, data: currentUserData })
  },

  async logIn({ commit }, { email, password }) {
    const currentUser = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    const currentUserData = { email, displayName: currentUser.user.displayName }
    commit('SET_USER', { loggedIn: true, data: currentUserData })
  },

  async logOut({ commit }) {
    await firebase.auth().signOut()
    commit('SET_USER', { loggedIn: false, data: null })
  }
}

const mutations = {
  SET_USER(state, { loggedIn, data }) {
    state.currentUser = { loggedIn, data }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
