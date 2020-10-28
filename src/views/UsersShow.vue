<template>
  <div class="users-show">
    <h1 v-if="user" class="text-center">{{ user.name }} Page</h1>
    <br />

    <b-card no-body>
      <b-tabs card>
        <b-tab title="Posted Questions" active
          ><b-card-text>
            <b-list-group>
              <b-list-group-item
                v-for="question in postedQuestions"
                :key="question.id"
                ><router-link
                  :to="{ name: 'QuestionsShow', params: { id: question.id } }"
                  >{{ question.title }}</router-link
                ></b-list-group-item
              ></b-list-group
            ></b-card-text
          ></b-tab
        >
        <b-tab title="Answered Questions"
          ><b-card-text>
            <b-list-group>
              <b-list-group-item
                v-for="question in answeredQuestions"
                :key="question.id"
                ><router-link
                  :to="{ name: 'QuestionsShow', params: { id: question.id } }"
                  >{{ question.title }}</router-link
                ></b-list-group-item
              ></b-list-group
            ></b-card-text
          ></b-tab
        >
      </b-tabs>
    </b-card>
    <br />
  </div>
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

<style scoped>
.users-show {
  width: 720px;
  margin: auto;
}
</style>
