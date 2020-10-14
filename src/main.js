import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vue from 'vue'

import App from './App.vue'
import * as fb from './common/firebase.config'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    fb.auth.onAuthStateChanged(user => {
      store.dispatch('auth/cbOnAuthStateChanged', user)
    })
  }
}).$mount('#app')
