import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.store'
import question from './modules/question.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { question, auth }
})
