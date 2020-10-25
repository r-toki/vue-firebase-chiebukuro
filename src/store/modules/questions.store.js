import * as fb from '../../common/firebase.config'

// store helper
const initialState = () => ({
  questions: [],
  nextQuestionsExist: false,
  prevQuestionsExist: false
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
  const questions = questionsDoc.map((questionDoc, index) =>
    Object.assign(
      { id: questionDoc.id, ...questionDoc.data() },
      { user: { id: usersDoc[index].id, ...usersDoc[index].data() } }
    )
  )
  return Promise.resolve(questions)
}

// store main
const state = {
  ...initialState()
}

const getters = {
  questions(state) {
    return state.questions
  },
  nextQuestionsExist(state) {
    return state.nextQuestionsExist
  },
  prevQuestionsExist(state) {
    return state.prevQuestionsExist
  }
}

const actions = {
  // the following functions are called in view
  resetState(context) {
    context.commit('SET_QUESTIONS', initialState().questions)
    context.commit(
      'SET_NEXT_QUESTIONS_EXIST',
      initialState().nextQuestionsExist
    )
    context.commit(
      'SET_PREV_QUESTIONS_EXIST',
      initialState().prevQuestionsExist
    )
  },
  async fetchFirstPage(context, { resolved, pageSize }) {
    await context.dispatch('fetchTopQuestions', { resolved, pageSize })
    // firstPage に対してはもちろん prevQuestions は存在しない
    await context.dispatch('checkNextQuestionsExist', resolved)
  },
  async fetchNextPage(context, { resolved, pageSize }) {
    await context.dispatch('fetchNextQuestions', { resolved, pageSize })
    await context.dispatch('checkPrevQuestionsExist', resolved)
    await context.dispatch('checkNextQuestionsExist', resolved)
  },
  async fetchPrevPage(context, { resolved, pageSize }) {
    await context.dispatch('fetchPrevQuestions', { resolved, pageSize })
    await context.dispatch('checkPrevQuestionsExist', resolved)
    await context.dispatch('checkNextQuestionsExist', resolved)
  },

  // helper for above functions
  async fetchTopQuestions(context, { resolved, pageSize }) {
    const questionsDoc = await getTopQuestionsDoc({ resolved, pageSize })
    const questions = await createQuestionsModel(questionsDoc)
    context.commit('SET_QUESTIONS', questions)
  },
  async fetchNextQuestions(context, { resolved, pageSize }) {
    const { questions } = context.getters
    const lastQuestion = questions[questions.length - 1]
    const nextQuestionsDoc = await getNextQuestionsDoc({
      resolved,
      pageSize,
      lastQuestion
    })
    const nextQuestions = await createQuestionsModel(nextQuestionsDoc)
    context.commit('SET_QUESTIONS', nextQuestions)
  },
  async fetchPrevQuestions(context, { resolved, pageSize }) {
    const { questions } = context.getters
    const firstQuestion = questions[0]
    const prevQuestionsDoc = await getPrevQuestionsDoc({
      resolved,
      pageSize,
      firstQuestion
    })
    const prevQuestions = await createQuestionsModel(prevQuestionsDoc)
    context.commit('SET_QUESTIONS', prevQuestions)
  },
  // 次の1個が存在するかを確認
  async checkNextQuestionsExist(context, resolved) {
    const { questions } = context.getters
    const lastQuestion = questions[questions.length - 1]
    const nextQuestionsDoc = await getNextQuestionsDoc({
      resolved,
      pageSize: 1,
      lastQuestion
    })
    const nextQuestionsExist = nextQuestionsDoc.length === 1
    context.commit('SET_NEXT_QUESTIONS_EXIST', nextQuestionsExist)
  },
  async checkPrevQuestionsExist(context, resolved) {
    const { questions } = context.getters
    const firstQuestion = questions[0]
    const prevQuestionsDoc = await getPrevQuestionsDoc({
      resolved,
      pageSize: 1,
      firstQuestion
    })
    const prevQuestionsExist = prevQuestionsDoc.length === 1
    context.commit('SET_PREV_QUESTIONS_EXIST', prevQuestionsExist)
  }
}

const mutations = {
  SET_QUESTIONS(state, questions) {
    state.questions = questions
  },
  SET_NEXT_QUESTIONS_EXIST(state, nextQuestionsExist) {
    state.nextQuestionsExist = nextQuestionsExist
  },
  SET_PREV_QUESTIONS_EXIST(state, prevQuestionsExist) {
    state.prevQuestionsExist = prevQuestionsExist
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
