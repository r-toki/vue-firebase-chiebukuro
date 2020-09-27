import Vue from 'vue'
import Vuex from 'vuex'
import questions from './modules/questions'
import currentUser from './modules/currentUser'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { questions, currentUser }
})
