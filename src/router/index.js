import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import SignUp from '../views/SignUp'
import LogIn from '../views/LogIn'
import QuestionsNew from '../views/QuestionsNew'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn
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
