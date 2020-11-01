import * as fb from '../../common/firebase.config'

// helper
const initialState = () => ({
  questions: [],
  nextQuestionExists: false,
  prevQuestionExists: false
})

const getTopQuestionsDoc = ({ resolved, pageSize }) => {
  return fb.questionsCollection
    .where('resolved', '==', resolved)
    .orderBy('createdAt', 'desc')
    .limit(pageSize)
    .get()
    .then(snapshot => snapshot.docs)
}

const getNextQuestionsDoc = ({ resolved, pageSize, lastQuestion }) => {
  return fb.questionsCollection
    .where('resolved', '==', resolved)
    .orderBy('createdAt', 'desc')
    .startAfter(lastQuestion.createdAt)
    .limit(pageSize)
    .get()
    .then(snapshot => snapshot.docs)
}

const getPrevQuestionsDoc = ({ resolved, pageSize, firstQuestion }) => {
  return fb.questionsCollection
    .where('resolved', '==', resolved)
    .orderBy('createdAt', 'desc')
    .endBefore(firstQuestion.createdAt)
    .limitToLast(pageSize)
    .get()
    .then(snapshot => snapshot.docs)
}

const createQuestionsModel = async questionsDoc => {
  const getUsersDoc = questionsDoc.map(questionDoc => {
    const userId = questionDoc.data().user.id
    return fb.usersCollection.doc(userId).get()
  })
  const usersDoc = await Promise.all(getUsersDoc)
  const getAnswersCount = questionsDoc.map(questionDoc => {
    return fb.answersCollection
      .where('question.id', '==', questionDoc.id)
      .get()
      .then(answersDoc => answersDoc.size)
  })
  const answersCount = await Promise.all(getAnswersCount)
  const questions = questionsDoc.map((questionDoc, index) =>
    Object.assign(
      { id: questionDoc.id, ...questionDoc.data() },
      { user: { id: usersDoc[index].id, ...usersDoc[index].data() } },
      { answersCount: answersCount[index] }
    )
  )
  return questions
}

// store main
const state = {
  ...initialState()
}

const getters = {
  questions(state) {
    return state.questions
  },

  nextQuestionExists(state) {
    return state.nextQuestionExists
  },

  prevQuestionExists(state) {
    return state.prevQuestionExists
  }
}

const actions = {
  // the following functions are called in view
  resetState(context) {
    context.commit('SET_QUESTIONS', initialState().questions)
    context.commit(
      'SET_NEXT_QUESTIONS_EXIST',
      initialState().nextQuestionExists
    )
    context.commit(
      'SET_PREV_QUESTIONS_EXIST',
      initialState().prevQuestionExists
    )
  },

  async storeFirstPage(context, { resolved, pageSize }) {
    await context.dispatch('storeTopQuestions', { resolved, pageSize })
    // firstPage に対してはもちろん prevQuestions は存在しないので default の falseのまま
    await context.dispatch('checkNextQuestionExists', resolved)
  },

  async storeNextPage(context, { resolved, pageSize }) {
    await context.dispatch('storeNextQuestions', { resolved, pageSize })
    await context.dispatch('checkPrevQuestionExists', resolved)
    await context.dispatch('checkNextQuestionExists', resolved)
  },

  async storePrevPage(context, { resolved, pageSize }) {
    await context.dispatch('storePrevQuestions', { resolved, pageSize })
    await context.dispatch('checkPrevQuestionExists', resolved)
    await context.dispatch('checkNextQuestionExists', resolved)
  },

  // helper for above functions
  async storeTopQuestions(context, { resolved, pageSize }) {
    const questionsDoc = await getTopQuestionsDoc({ resolved, pageSize })
    const questions = await createQuestionsModel(questionsDoc)
    context.commit('SET_QUESTIONS', questions)
  },

  async storeNextQuestions(context, { resolved, pageSize }) {
    const nextQuestionsDoc = await getNextQuestionsDoc({
      resolved,
      pageSize,
      lastQuestion: context.getters.questions.slice(-1)[0]
    })
    const nextQuestions = await createQuestionsModel(nextQuestionsDoc)
    context.commit('SET_QUESTIONS', nextQuestions)
  },

  async storePrevQuestions(context, { resolved, pageSize }) {
    const prevQuestionsDoc = await getPrevQuestionsDoc({
      resolved,
      pageSize,
      firstQuestion: context.getters.questions[0]
    })
    const prevQuestions = await createQuestionsModel(prevQuestionsDoc)
    context.commit('SET_QUESTIONS', prevQuestions)
  },

  // 次の1個が存在するかを確認
  async checkNextQuestionExists(context, resolved) {
    const nextQuestionsDoc = await getNextQuestionsDoc({
      resolved,
      pageSize: 1,
      lastQuestion: context.getters.questions.slice(-1)[0]
    })
    const nextQuestionExists = nextQuestionsDoc.length === 1
    context.commit('SET_NEXT_QUESTIONS_EXIST', nextQuestionExists)
  },

  async checkPrevQuestionExists(context, resolved) {
    const prevQuestionsDoc = await getPrevQuestionsDoc({
      resolved,
      pageSize: 1,
      firstQuestion: context.getters.questions[0]
    })
    const prevQuestionExists = prevQuestionsDoc.length === 1
    context.commit('SET_PREV_QUESTIONS_EXIST', prevQuestionExists)
  }
}

const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions
  },

  SET_NEXT_QUESTIONS_EXIST(state, nextQuestionExists) {
    state.nextQuestionExists = nextQuestionExists
  },

  SET_PREV_QUESTIONS_EXIST(state, prevQuestionExists) {
    state.prevQuestionExists = prevQuestionExists
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
