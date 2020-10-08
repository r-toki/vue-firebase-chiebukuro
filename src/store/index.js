import Vue from 'vue'
import Vuex from 'vuex'
import questions from './modules/questions'
import home from './modules/home'
import users from './modules/users'
import answers from './modules/answers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { questions, home, users, answers }
})
