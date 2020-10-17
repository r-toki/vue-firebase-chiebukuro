import * as fb from '../../common/firebase.config'

const initialState = {
  question: null,
  unwatchQuestion: null,
  answers: [],
  unwatchAnswers: null
}

const state = {
  ...initialState
}

const getters = {
  question(state) {
    return state.question
  },
  bestAnswer(state) {
    return state.answers.find(
      answer => answer.id === state.question.bestAnswer.id
    )
  },
  otherAnswers(state) {
    return state.answers.filter(
      answer => answer.id !== state.question.bestAnswer.id
    )
  }
}

const actions = {
  watchQuestion(context, id) {
    const unwatchQuestion = fb.questionsCollection
      .doc(id)
      .onSnapshot(questionDoc => {
        const userId = questionDoc.data().user.id
        fb.usersCollection
          .doc(userId)
          .get()
          .then(userDoc => {
            const question = Object.assign(
              {
                id: questionDoc.id,
                ...questionDoc.data()
              },
              {
                user: { id: userDoc.id, ...userDoc.data() }
              }
            )
            context.commit('SET_QUESTION', question)
          })
      })
    context.commit('SET_UNWATCH_QUESTION', unwatchQuestion)
  },
  resetQuestion(context) {
    context.commit('UNWATCH_QUESTION')
    context.commit('SET_QUESTION', initialState.question)
    context.commit('SET_UNWATCH_QUESTION', initialState.unwatchQuestion)
  },
  watchAnswers(context, id) {
    const unwatchAnswers = fb.answersCollection
      .where('question.id', '==', id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(answersSnapshot => {
        const getUsers = answersSnapshot.docs.map(answerDoc => {
          const userId = answerDoc.data().user.id
          return fb.usersCollection.doc(userId).get()
        })
        Promise.all(getUsers).then(users => {
          const answers = answersSnapshot.docs.map((answerDoc, index) => ({
            id: answerDoc.id,
            ...answerDoc.data(),
            user: {
              id: users[index].id,
              ...users[index].data()
            }
          }))
          context.commit('SET_ANSWERS', answers)
        })
      })
    context.commit('SET_UNWATCH_ANSWERS', unwatchAnswers)
  },
  resetAnswers(context) {
    context.commit('UNWATCH_ANSWERS')
    context.commit('SET_ANSWERS', initialState.answers)
    context.commit('SET_UNWATCH_ANSWERS', initialState.unwatchAnswers)
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
