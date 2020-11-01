<template>
  <div class="home">
    <h1 class="text-center mt-3">Home</h1>

    <h2 class="mt-3">Resolved Questions</h2>
    <b-list-group>
      <b-list-group-item
        v-for="question in resolvedQuestions"
        :key="question.id"
      >
        <router-link
          :to="{ name: 'QuestionsShow', params: { id: question.id } }"
          >{{ question.title }}</router-link
        >
      </b-list-group-item>
      <b-list-group-item>
        <router-link to="/questions?resolved=true" class="float-right"
          >Resolved Questions</router-link
        >
      </b-list-group-item>
    </b-list-group>

    <h2 class="mt-3">Unresolved Questions</h2>
    <b-list-group>
      <b-list-group-item
        v-for="question in unresolvedQuestions"
        :key="question.id"
      >
        <router-link
          :to="{ name: 'QuestionsShow', params: { id: question.id } }"
          >{{ question.title }}</router-link
        >
      </b-list-group-item>
      <b-list-group-item>
        <router-link to="/questions?resolved=false" class="float-right"
          >Unresolved Questions</router-link
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import store from '../store'

export default {
  name: 'Home',
  data() {
    return { questionForm: { title: '' } }
  },
  computed: {
    ...mapGetters('home', ['resolvedQuestions', 'unresolvedQuestions'])
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('home/watchResolvedQuestions')
    store.dispatch('home/watchUnresolvedQuestions')
    next()
  }
}
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: auto;
}
</style>
