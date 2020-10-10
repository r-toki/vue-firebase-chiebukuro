import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import * as fb from './common/firebase.config'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    fb.auth.onAuthStateChanged(user => {
      store.dispatch('users/cbOnAuthStateChanged', { user })
    })
  }
}).$mount('#app')
