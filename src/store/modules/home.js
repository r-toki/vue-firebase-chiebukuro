import firebase from '@/firebaseInit'
const db = firebase.firestore()

const state = {
  resolvedQuestions: [],
  unresolvedQuestions: []
}

const getters = {
  resolvedQuestions(state) {
    return state.resolvedQuestions
  },
  unresolvedQuestions(state) {
    return state.unresolvedQuestions
  }
}

const actions = {
  async fetchResolvedQuestions({ commit }) {
    const resolvedQuestions = []
    const snapshot = await db
      .collection('questions')
      .where('resolved', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()
    snapshot.forEach(doc => {
      resolvedQuestions.push({
        id: doc.id,
        title: doc.data().title
      })
    })
    commit('SET_RESOLVED_QUESTIONS', resolvedQuestions)
  },

  async fetchUnresolvedQuestions({ commit }) {
    const unresolvedQuestions = []
    const snapshot = await db
      .collection('questions')
      .where('resolved', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get()
    snapshot.forEach(doc => {
      unresolvedQuestions.push({
        id: doc.id,
        title: doc.data().title
      })
    })
    commit('SET_UNRESOLVED_QUESTIONS', unresolvedQuestions)
  }
}

const mutations = {
  SET_RESOLVED_QUESTIONS(state, resolvedQuestions) {
    state.resolvedQuestions = resolvedQuestions
  },

  SET_UNRESOLVED_QUESTIONS(state, unresolvedQuestions) {
    state.unresolvedQuestions = unresolvedQuestions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
