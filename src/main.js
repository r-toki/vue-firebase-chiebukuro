import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import firebase from './firebaseInit'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('users/fetchCurrentUser', { id: user.uid })
        router.push({ name: 'UsersShow', params: { id: user.uid } })
      } else {
        router.push({ name: 'Home' })
      }
    })
  }
}).$mount('#app')
