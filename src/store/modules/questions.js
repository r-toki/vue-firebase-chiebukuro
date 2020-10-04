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
  async fetchQuestions(context, payload) {
    const { resolved } = payload
    await db
      .collection('questions')
      .where('resolved', '==', resolved)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const questions = snapshot.docs.map(doc => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data()
        }))
        context.commit('SET_QUESTIONS', questions)
      })
  },
  createQuestion(context, question) {
    return db.collection('questions').add(question)
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
