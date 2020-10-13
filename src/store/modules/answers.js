import * as fb from '../../common/firebase.config'

const state = {
  answers: [],
  answersUnwatch: null
}

const getters = {
  answers(state) {
    return state.answers
  }
}

const actions = {
  resetAnswers(context) {
    context.commit('RESET_ANSWERS')
  },

  // 以下は firebase.firestore() に関連する処理
  fbAnswerCreate(context, data) {
    return fb.answersCollection.add(data)
  },
  // この処理が長すぎる気がする
  fbAnswersWatch(context, questionId) {
    return new Promise(resolve => {
      const answersUnwatch = fb.answersCollection
        .where('questionId', '==', questionId)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const readUsers = snapshot.docs.map(doc =>
            context.dispatch('users/fbUserRead', doc.data().userId, {
              root: true
            })
          )
          Promise.all(readUsers).then(users => {
            const answers = snapshot.docs.map((doc, index) => ({
              id: doc.id,
              ref: doc.ref,
              ...doc.data(),
              user: { ...users[index].data() }
            }))
            context.commit('SET_ANSWERS', answers)
            context.commit('SET_ANSWERS_UNWATCH', answersUnwatch)
            resolve()
          })
        })
    })
  }
}

const mutations = {
  SET_ANSWERS(state, answers) {
    state.answers = answers
  },
  SET_ANSWERS_UNWATCH(state, answersUnwatch) {
    state.answersUnwatch = answersUnwatch
  },
  RESET_ANSWERS(state) {
    state.answersUnwatch()
    state.answers = null
    state.answersUnwatch = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
