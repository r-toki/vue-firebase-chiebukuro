import firebase from '@/firebaseInit'
const db = firebase.firestore()

const state = {
  questions: []
}

const getters = {
  questions(state) {
    return state.questions
  }
}

const actions = {
  async fetchQuestions({ commit }) {
    const questions = []
    const snapshot = await db
      .collection('questions')
      .orderBy('createdAt', 'desc')
      .get()
    snapshot.forEach(doc => {
      questions.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        resolved: doc.data().resolved
      })
    })
    commit('SET_QUESTIONS', { questions })
  },

  async addQuestion({ commit }, question) {
    await db.collection('questions').add(question)
    commit('ADD_QUESTION', { question })
  }
}

const mutations = {
  SET_QUESTIONS(state, { questions }) {
    state.questions = questions
  },

  ADD_QUESTION(state, { question }) {
    state.questions.unshift(question)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
