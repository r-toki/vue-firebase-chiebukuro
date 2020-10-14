import Vue from 'vue'
import Vuex from 'vuex'

import answers from './modules/answers'
import auth from './modules/auth.store'
import questions from './modules/questions'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { users, questions, answers, auth }
})
