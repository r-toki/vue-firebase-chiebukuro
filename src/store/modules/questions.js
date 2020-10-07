import firebaseApp from '../../firebaseInit'
const db = firebaseApp.firestore()

const state = {
  questions: [],
  question: null
}

const getters = {
  questions(state) {
    return state.questions
  },
  question(state) {
    return state.question
  }
}

const actions = {
  async watchQuestions(context, payload) {
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
  async watchQuestion(context, payload) {
    const { id } = payload
    await db
      .collection('questions')
      .doc(id)
      .onSnapshot(doc => {
        const question = { id: doc.id, ref: doc.ref, ...doc.data() }
        context.commit('SET_QUESTION', question)
      })
  },
  createQuestion(context, question) {
    return db.collection('questions').add(question)
  }
}

const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions
  },
  SET_QUESTION(state, question) {
    state.question = question
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
