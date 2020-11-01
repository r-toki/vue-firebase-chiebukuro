<template>
  <div class="questions-index" v-if="!loading">
    <h3 class="text-center mb-3">{{ title }}</h3>

    <b-list-group>
      <b-list-group-item v-for="question in questions" :key="question.id">
        <router-link
          :to="{ name: 'QuestionsShow', params: { id: question.id } }"
          >{{ question.title }}</router-link
        >
        <div class="text-muted">
          <span>
            <router-link
              :to="{ name: 'UsersShow', params: { id: question.user.id } }"
            >
              {{ question.user.name }}
            </router-link>
            asked at
          </span>
          <span>{{ formatCreatedAt(question.createdAt) }}</span>
          <span> / </span>
          <span>{{ pluralizeAnswersCount(question) }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
    <br />

    <div class="d-flex justify-content-center">
      <b-button
        @click="onClickPrevButton()"
        variant="outline-primary"
        :disabled="!prevQuestionExists"
        class="mr-3"
      >
        <b-icon icon="arrow-left"></b-icon>
        Prev
      </b-button>
      <b-button
        @click="onClickNextButton()"
        variant="outline-primary"
        :disabled="!nextQuestionExists"
        class="ml-3"
      >
        Next
        <b-icon icon="arrow-right"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

import store from '../store'

const PAGE_SIZE = 10

export default {
  name: 'QuestionsIndex',
  data() {
    return { loading: false }
  },
  computed: {
    ...mapGetters({
      questions: 'questions/questions',
      nextQuestionExists: 'questions/nextQuestionExists',
      prevQuestionExists: 'questions/prevQuestionExists'
    }),
    resolved() {
      return this.$route.query.resolved === 'true'
    },
    pageSize() {
      return PAGE_SIZE
    },
    title() {
      return this.resolved ? 'Resolved Questions' : 'Unresolved Questions'
    }
  },
  methods: {
    ...mapActions({
      storeNextPage: 'questions/storeNextPage',
      storePrevPage: 'questions/storePrevPage'
    }),
    async onClickNextButton() {
      this.loading = true
      await this.storeNextPage({
        resolved: this.resolved,
        pageSize: this.pageSize
      })
      this.loading = false
    },
    async onClickPrevButton() {
      this.loading = true
      await this.storePrevPage({
        resolved: this.resolved,
        pageSize: this.pageSize
      })
      this.loading = false
    },
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
    },
    pluralizeAnswersCount(question) {
      const pluralizedAnswer =
        question.answersCount === 1 ? 'Answer' : 'Answers'
      return `${question.answersCount} ${pluralizedAnswer}`
    }
  },
  beforeRouteEnter(to, from, next) {
    const resolved = to.query.resolved === 'true'
    store
      .dispatch('questions/storeFirstPage', {
        resolved,
        pageSize: PAGE_SIZE
      })
      .then(() => {
        next()
      })
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch('questions/resetState').then(() => {
      next()
    })
  }
}
</script>

<style scoped>
.questions-index {
  width: 720px;
  margin: 0 auto 20px;
}
</style>
