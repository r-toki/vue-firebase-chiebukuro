import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.store'
import question from './modules/question.store'
import questions from './modules/questions.store'
import user from './modules/user.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, question, questions, user }
})
