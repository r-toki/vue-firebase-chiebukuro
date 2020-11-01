import * as fb from '../../common/firebase.config'

const initialState = () => ({
  user: null,
  unwatchUser: null,

  postedQuestions: [],
  unwatchPostedQuestions: null,

  answeredQuestions: [],
  unwatchAnsweredQuestions: null
})

const state = {
  ...initialState()
}

const getters = {
  user(state) {
    return state.user
  },

  postedQuestions(state) {
    return state.postedQuestions
  },

  answeredQuestions(state) {
    return state.answeredQuestions
  }
}

const actions = {
  watchUser(context, id) {
    const unwatchUser = fb.usersCollection.doc(id).onSnapshot(userDoc => {
      context.commit('SET_USER', { id: userDoc.id, ...userDoc.data() })
    })
    context.commit('SET_UNWATCH_USER', unwatchUser)
  },

  resetUser(context) {
    // todo: +Ask よりログイン画面に遷移する場合に二回実行される
    if (context.unwatchUser) {
      context.commit('UNWATCH_USER')
      context.commit('SET_UNWATCH_USER', initialState().unwatchUser)
    }
    context.commit('SET_USER', initialState().user)
  },

  watchPostedQuestions(context, userId) {
    const unwatchPostedQuestions = fb.questionsCollection
      .where('user.id', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const questions = snapshot.docs.map(questionDoc => ({
          id: questionDoc.id,
          ...questionDoc.data()
        }))
        context.commit('SET_POSTED_QUESTIONS', questions)
      })
    context.commit('SET_UNWATCH_POSTED_QUESTIONS', unwatchPostedQuestions)
  },

  resetPostedQuestions(context) {
    if (context.state.unwatchPostedQuestions) {
      context.commit('UNWATCH_POSTED_QUESTIONS')
      context.commit(
        'SET_UNWATCH_POSTED_QUESTIONS',
        initialState().unwatchPostedQuestions
      )
    }
    context.commit('SET_POSTED_QUESTIONS', initialState().postedQuestions)
  },

  watchAnsweredQuestions(context, userId) {
    const unwatchAnsweredQuestions = fb.questionsCollection
      .orderBy('createdAt', 'desc')
      .onSnapshot(async snapshot => {
        const userAnswers = await fb.answersCollection
          .where('user.id', '==', userId)
          .get()
        const userAnsweredQuestionIds = userAnswers.docs.map(
          answer => answer.data().question.id
        )
        const answeredQuestions = snapshot.docs
          .filter(questionDoc =>
            userAnsweredQuestionIds.includes(questionDoc.id)
          )
          .map(questionDoc => ({ id: questionDoc.id, ...questionDoc.data() }))
        context.commit('SET_ANSWERED_QUESTIONS', answeredQuestions)
      })
    context.commit('SET_UNWATCH_ANSWERED_QUESTIONS', unwatchAnsweredQuestions)
  },

  resetAnsweredQuestions(context) {
    context.commit('UNWATCH_ANSWERED_QUESTIONS')
    context.commit('SET_ANSWERED_QUESTIONS', initialState().answeredQuestions)
    context.commit(
      'UNWATCH_ANSWERED_QUESTIONS',
      initialState().unwatchAnsweredQuestions
    )
  }
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SET_UNWATCH_USER(state, unwatchUser) {
    state.unwatchUser = unwatchUser
  },

  UNWATCH_USER(state) {
    state.unwatchUser()
  },

  SET_POSTED_QUESTIONS(state, postedQuestions) {
    state.postedQuestions = postedQuestions
  },

  SET_UNWATCH_POSTED_QUESTIONS(state, unwatchPostedQuestions) {
    state.unwatchPostedQuestions = unwatchPostedQuestions
  },

  UNWATCH_POSTED_QUESTIONS(state) {
    state.unwatchPostedQuestions()
  },

  SET_ANSWERED_QUESTIONS(state, answeredQuestions) {
    state.answeredQuestions = answeredQuestions
  },

  SET_UNWATCH_ANSWERED_QUESTIONS(state, unwatchAnsweredQuestions) {
    state.unwatchAnsweredQuestions = unwatchAnsweredQuestions
  },

  UNWATCH_ANSWERED_QUESTIONS(state) {
    state.unwatchAnsweredQuestions
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
