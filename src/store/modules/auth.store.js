import * as fb from '../../common/firebase.config'
import router from '../../router'

const state = {
  currentUser: null
}

const getters = {
  currentUser(state) {
    return state.currentUser
  },
  loggedIn(state) {
    return state.currentUser !== null
  }
}

const actions = {
  // mutation を実行する処理
  setCurrentUser(context, user) {
    context.commit('SET_CURRENT_USER', user)
    return Promise.resolve()
  },

  // auth 関連で用いる firebase.auth firebase.firestore の処理の wrapper
  signUp(context, { email, password }) {
    return fb.auth.createUserWithEmailAndPassword(email, password)
  },
  logIn(context, { email, password }) {
    return fb.auth.signInWithEmailAndPassword(email, password)
  },
  logOut() {
    return fb.auth.signOut()
  },
  createUser(context, id) {
    return fb.usersCollection
      .doc(id)
      .set({ name: context.getters.currentUser.name })
  },

  // onAuthStateChanged の callback 処理
  async cbOnAuthStateChanged(context, user) {
    if (user) {
      const userDoc = await fb.usersCollection.doc(user.uid).get()
      if (userDoc.data()) {
        return context.dispatch('cbLogIn', userDoc)
      } else {
        return context.dispatch('cbSignUp', user.uid)
      }
    } else {
      return context.dispatch('cbLogOut')
    }
  },
  async cbSignUp(context, id) {
    await context.dispatch('createUser', id)
    const userDoc = await fb.usersCollection.doc(id).get()
    await context.dispatch('setCurrentUser', {
      id: userDoc.id,
      ...userDoc.data()
    })
    const redirectPath = router.currentRoute.query.redirect
    if (redirectPath) {
      return router.push({ path: redirectPath })
    } else {
      return router.push({ name: 'Home' }).catch(() => {})
    }
  },
  async cbLogIn(context, userDoc) {
    await context.dispatch('setCurrentUser', {
      id: userDoc.id,
      ...userDoc.data()
    })
    const redirectPath = router.currentRoute.query.redirect
    if (redirectPath) {
      return router.push({ path: redirectPath })
    } else {
      // 開発中 update のたびに redirect されると不便なためコメントアウト
      // return router.push({ name: 'Home' }).catch(() => {})
    }
  },
  async cbLogOut(context) {
    await context.dispatch('setCurrentUser', null)
    // 開発中 update のたびに redirect されると不便なためコメントアウト
    // return router.push({ name: 'Home' }).catch(() => {})
  }
}

const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
