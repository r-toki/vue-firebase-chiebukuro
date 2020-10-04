import firebaseApp from '@/firebaseInit'
const db = firebaseApp.firestore()

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
    const { user } = await firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await db
      .collection('users')
      .doc(user.uid)
      .set({ name })
  },
  async logIn(context, payload) {
    const { email, password } = payload
    await firebaseApp.auth().signInWithEmailAndPassword(email, password)
  },
  async logOut(context) {
    await firebaseApp.auth().signOut()
    context.commit('SET_CURRENT_USER', null)
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
