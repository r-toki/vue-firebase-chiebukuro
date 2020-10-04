import firebase from '@/firebaseInit'
const db = firebase.firestore()

const state = {
  currentUser: null
}

const getters = {
  currentUser(state) {
    return state.currentUser
  }
}

const actions = {
  async signUp(context, payload) {
    const { email, password, name } = payload
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await db
      .collection('users')
      .doc(user.uid)
      .set({ name })
    await context.dispatch('fetchCurrentUser', { id: user.uid })
  },
  async logIn(context, payload) {
    const { email, password } = payload
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    await context.dispatch('fetchCurrentUser', { id: user.uid })
  },
  async fetchCurrentUser(context, payload) {
    const { id } = payload
    const currentUserDoc = await db
      .collection('users')
      .doc(id)
      .get()
    const currentUser = {
      id: currentUserDoc.id,
      ref: currentUserDoc.ref,
      ...currentUserDoc.data()
    }
    context.commit('SET_CURRENT_USER', currentUser)
  },
  async logOut(context) {
    await firebase.auth().signOut()
    context.commit('SET_CURRENT_USER', null)
  }
}

const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
