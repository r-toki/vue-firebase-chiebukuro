import firebaseApp from '../../firebaseInit'
const db = firebaseApp.firestore()

const state = {
  currentUser: null,
  users: [],
  user: null
}

const getters = {
  currentUser(state) {
    return state.currentUser
  },
  findUserFromUsers(state) {
    return function(id) {
      return state.users.find(user => user.id === id)
    }
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
  },
  async watchUsers(context) {
    await db.collection('users').onSnapshot(snapshot => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ref: doc.ref,
        ...doc.data()
      }))
      context.commit('SET_USERS', users)
    })
  }
}

const mutations = {
  SET_CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser
  },
  SET_USERS(state, users) {
    state.users = users
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
