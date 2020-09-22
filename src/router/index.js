import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home'
import LogIn from '@/views/LogIn'
import MyPage from '@/views/MyPage'
import QuestionDetail from '@/views/QuestionDetail'
import QuestionList from '@/views/QuestionList'
import QuestionPostForm from '@/views/QuestionPostForm'
import SignUp from '@/views/SignUp'

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
    path: '/my-page',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/question-detail/:id',
    name: 'QuestionDetail',
    component: QuestionDetail
  },
  {
    path: '/question-list',
    name: 'QuestionList',
    component: QuestionList
  },
  {
    path: '/question-post-form',
    name: 'QuestionPostForm',
    component: QuestionPostForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
