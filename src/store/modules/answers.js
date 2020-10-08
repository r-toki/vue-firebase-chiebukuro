import firebaseApp from '../../firebaseInit'
const db = firebaseApp.firestore()

const state = {
  answersOfQuestion: []
}

const getters = {
  answersOfQuestion(state) {
    return state.answersOfQuestion
  }
}

const actions = {
  async watchAnswersOfQuestion(context, payload) {
    const { questionId } = payload
    await db
      .collection('answers')
      .where('questionId', '==', questionId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const answersOfQuestion = snapshot.docs.map(doc => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data()
        }))
        context.commit('SET_ANSWERS_OF_QUESTION', answersOfQuestion)
      })
  },
  createAnswer(context, answer) {
    return db.collection('answers').add(answer)
  }
}

const mutations = {
  SET_ANSWERS_OF_QUESTION(state, answersOfQuestion) {
    state.answersOfQuestion = answersOfQuestion
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
