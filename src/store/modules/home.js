import firebase from '../../firebaseInit'
const db = firebase.firestore()

function queryOfQuestions(payload) {
  const { resolved } = payload
  return db
    .collection('questions')
    .where('resolved', '==', resolved)
    .orderBy('createdAt', 'desc')
    .limit(5)
}

function toQuestionsFromSnapshot(snapshot) {
  const questions = snapshot.docs.map(doc => ({
    id: doc.id,
    ref: doc.ref,
    ...doc.data()
  }))
  return questions
}

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
  watchResolvedQuestions(context) {
    queryOfQuestions({ resolved: true }).onSnapshot(snapshot => {
      const questions = toQuestionsFromSnapshot(snapshot)
      context.commit('SET_RESOLVED_QUESTIONS', questions)
    })
  },
  watchUnresolvedQuestions(context) {
    queryOfQuestions({ resolved: false }).onSnapshot(snapshot => {
      const questions = toQuestionsFromSnapshot(snapshot)
      context.commit('SET_UNRESOLVED_QUESTIONS', questions)
    })
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
