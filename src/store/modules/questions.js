import * as fb from '../../common/firebase.config'

const state = {
  question: null,
  questionUnwatch: null
}

const getters = {
  question(state) {
    return state.question
  }
}

const actions = {
  resetQuestion(context) {
    context.commit('RESET_QUESTION')
  },

  // 以下は firebase.firestore() に関連する処理
  fbQuestionCreate(context, data) {
    return fb.questionsCollection.add(data)
  },
  fbQuestionUpdate(context, { id, data }) {
    return fb.questionsCollection.doc(id).set(data)
  },
  fbQuestionWatch(context, id) {
    return new Promise(resolve => {
      const questionUnwatch = fb.questionsCollection.doc(id).onSnapshot(doc => {
        context
          .dispatch('users/fbUserRead', doc.data().userId, { root: true })
          .then(userDoc => {
            const question = {
              id: doc.id,
              ref: doc.ref,
              ...doc.data(),
              user: { ...userDoc.data() }
            }
            context.commit('SET_QUESTION', question)
            context.commit('SET_QUESTION_UNWATCH', questionUnwatch)
            resolve()
          })
      })
    })
  }
}

const mutations = {
  SET_QUESTION(state, question) {
    state.question = question
  },
  SET_QUESTION_UNWATCH(state, questionUnwatch) {
    state.questionUnwatch = questionUnwatch
  },
  RESET_QUESTION(state) {
    state.questionUnwatch()
    state.question = null
    state.questionUnwatch = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
