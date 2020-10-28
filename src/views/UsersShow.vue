<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'

import store from '../store'

export default {
  name: 'UsersShow',
  computed: {
    ...mapGetters('user', ['user', 'postedQuestions', 'answeredQuestions'])
  },
  beforeRouteEnter(to, from, next) {
    const userId = to.params.id
    store.dispatch('user/watchUser', userId)
    store.dispatch('user/watchPostedQuestions', userId)
    store.dispatch('user/watchAnsweredQuestions', userId)
    next()
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch('user/resetUser')
    store.dispatch('user/resetPostedQuestions')
    store.dispatch('user/resetAnsweredQuestions')
    next()
  }
}
</script>
