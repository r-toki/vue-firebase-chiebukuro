import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import * as firebase from 'firebase'
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

const firebaseConfig = {
  apiKey: 'AIzaSyDpbiTaocmzfL_IEUoid9G1yypaGSj_g7Q',
  authDomain: 'vue-firebase-chiebukuro.firebaseapp.com',
  databaseURL: 'https://vue-firebase-chiebukuro.firebaseio.com',
  projectId: 'vue-firebase-chiebukuro',
  storageBucket: 'vue-firebase-chiebukuro.appspot.com',
  messagingSenderId: '578353730992',
  appId: '1:578353730992:web:177e5ec73902437363f275',
  measurementId: 'G-2B6CESYCL8'
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
