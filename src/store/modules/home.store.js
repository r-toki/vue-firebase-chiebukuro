import * as fb from '../../common/firebase.config'

const initialState = () => ({
  resolvedQuestions: [],
  unresolvedQuestions: []
})

const state = {
  ...initialState()
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
    fb.questionsCollection
      .where('resolved', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .onSnapshot(snapshot => {
        context.commit(
          'SET_RESOLVED_QUESTIONS',
          snapshot.docs.map(questions => ({
            id: questions.id,
            ...questions.data()
          }))
        )
      })
  },

  watchUnresolvedQuestions(context) {
    fb.questionsCollection
      .where('resolved', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .onSnapshot(snapshot => {
        context.commit(
          'SET_UNRESOLVED_QUESTIONS',
          snapshot.docs.map(questions => ({
            id: questions.id,
            ...questions.data()
          }))
        )
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
