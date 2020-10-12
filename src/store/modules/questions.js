import * as fb from '../../common/firebase.config'

const state = {}

const getters = {}

const actions = {
  // 以下は firebase.firestore() に関連する処理
  fbQuestionCreate(context, question) {
    return fb.questionsCollection.add(question)
  }
}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
