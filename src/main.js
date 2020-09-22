import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'

import App from '@/App'
import firebase from '@/firebaseInit'
import router from '@/router'
import store from '@/store'

firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
})

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
