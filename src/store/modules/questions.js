import * as fb from '../../common/firebase.config'

const state = {}

const getters = {}

const actions = {
  // 以下は firebase.firestore() に関連する処理
  fbQuestionCreate(context, { data }) {
    return fb.questionsCollection.add(data)
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
