import firebase from '@/firebaseInit'
const db = firebase.firestore()

const state = () => ({
  questions: []
})

const getters = {
  questions(state) {
    return state.questions
  }
}

const actions = {
  async fetchQuestions({ commit }) {
    const questions = []
    const snapshot = await db.collection('questions').get()
    snapshot.forEach(doc => {
      questions.push({ id: doc.id, title: doc.data().title })
    })
    commit('SET_QUESTIONS', questions)
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
