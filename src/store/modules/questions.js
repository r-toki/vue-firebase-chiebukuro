import firebaseApp from '@/firebaseInit'
const db = firebaseApp.firestore()

const state = {
  questions: []
}

const getters = {
  questions(state) {
    return state.questions
  }
}

const actions = {
  async createQuestion(context, question) {
    await db.collection('questions').add(question)
  }
}

const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
