import * as fb from '../../common/firebase.config'

const state = {
  question: null,
  unwatchQuestion: null,
  answers: [],
  unwatchAnswers: null
}

const getters = {
  question(state) {
    return state.question
  },
  answers(state) {
    return state.answers
  }
}

const actions = {
  watchQuestion(context, id) {
    const unwatchQuestion = fb.questionsCollection
      .doc(id)
      .onSnapshot(questionDoc => {
        questionDoc
          .data()
          .user.ref.get()
          .then(userDoc => {
            const question = Object.assign(
              {
                id: questionDoc.id,
                ref: questionDoc.ref,
                ...questionDoc.data()
              },
              {
                user: { id: userDoc.id, ref: userDoc.ref, ...userDoc.data() }
              }
            )
            context.commit('SET_QUESTION', question)
            context.commit('SET_UNWATCH_QUESTION', unwatchQuestion)
          })
      })
  },
  resetQuestion(context) {
    context.commit('UNWATCH_QUESTION')
    context.commit('SET_QUESTION', null)
    context.commit('SET_UNWATCH_QUESTION', null)
  },
  watchAnswers(context, id) {
    const unwatchAnswers = fb.answersCollection
      .where('question.id', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(answerSnapshot => {
        const getUsers = answerSnapshot.docs.map(answerDoc =>
          answerDoc.data().user.ref.get()
        )
        Promise.all(getUsers).then(users => {
          const answers = answerSnapshot.docs.map((answerDoc, index) => ({
            id: answerDoc.id,
            ref: answerDoc.ref,
            ...answerDoc.data(),
            user: {
              id: users[index].id,
              ref: users[index].ref,
              ...users[index].data()
            }
          }))
          context.commit('SET_ANSWERS', answers)
          context.commit('SET_UNWATCH_ANSWERS', unwatchAnswers)
        })
      })
  },
  resetAnswers(context) {
    context.commit('UNWATCH_ANSWERS')
    context.commit('SET_ANSWERS', null)
    context.commit('SET_UNWATCH_ANSWERS', null)
  }
}

const mutations = {
  SET_QUESTION(state, question) {
    state.question = question
  },
  SET_UNWATCH_QUESTION(state, unwatchQuestion) {
    state.unwatchQuestion = unwatchQuestion
  },
  UNWATCH_QUESTION(state) {
    state.unwatchQuestion()
  },
  SET_ANSWERS(state, answers) {
    state.answers = answers
  },
  SET_UNWATCH_ANSWERS(state, unwatchAnswers) {
    state.unwatchAnswers = unwatchAnswers
  },
  UNWATCH_ANSWERS(state) {
    state.unwatchAnswers()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
