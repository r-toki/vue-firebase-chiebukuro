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

  // firebase.auth firebase.firestore の処理
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
  readUser(context, id) {
    return fb.usersCollection.doc(id).get()
  },

  // onAuthStateChanged の callback 処理
  cbOnAuthStateChanged(context, user) {
    if (user) {
      context.dispatch('readUser', user.uid).then(userDoc => {
        if (userDoc.data()) {
          return context.dispatch('cbLogIn', userDoc)
        } else {
          return context.dispatch('cbSignUp', user.uid)
        }
      })
    } else {
      return context.dispatch('cbLogOut')
    }
  },
  cbSignUp(context, id) {
    return context
      .dispatch('createUser', id)
      .then(() => {
        return context.dispatch('readUser', id)
      })
      .then(userDoc => {
        return context.dispatch('setCurrentUser', {
          id: userDoc.id,
          ...userDoc.data()
        })
      })
      .then(() => {
        const redirectPath = router.currentRoute.query.redirect
        if (redirectPath) {
          return router.push({ path: redirectPath })
        } else {
          return router.push({ name: 'Home' }).catch(() => {})
        }
      })
  },
  cbLogIn(context, userDoc) {
    return context
      .dispatch('setCurrentUser', { id: userDoc.id, ...userDoc.data() })
      .then(() => {
        const redirectPath = router.currentRoute.query.redirect
        if (redirectPath) {
          return router.push({ path: redirectPath })
        } else {
          return router.push({ name: 'Home' }).catch(() => {})
        }
      })
  },
  cbLogOut(context) {
    return context.dispatch('setCurrentUser', null).then(() => {
      return router.push({ name: 'Home' }).catch(() => {})
    })
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
