import Vue from 'vue'
import VueRouter from 'vue-router'
import QuestionsIndex from '../views/QuestionsIndex'
import QuestionsNew from '../views/QuestionsNew'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: QuestionsIndex
  },
  {
    path: '/questions',
    name: 'QuestionsIndex',
    component: QuestionsIndex
  },
  {
    path: '/questions/new',
    name: 'QuestionsNew',
    component: QuestionsNew
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
