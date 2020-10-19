<template>
  <div class="questions-show" v-if="question !== null">
    <QuestionItem
      :question="question"
      :isResolvedQuestion="isResolvedQuestion"
      :isCurrentUserQuestion="isCurrentUserQuestion"
      @deleteQuestion="onDeleteQuestion"
    ></QuestionItem>
    <br />

    <div v-if="!isResolvedQuestion && loggedIn">
      <AnswerForm :questionId="question.id"></AnswerForm>
      <br />
    </div>

    <b-list-group>
      <h5>{{ answersHeading }}</h5>
      <BestAnswerItem v-if="bestAnswer" :answer="bestAnswer"></BestAnswerItem>
      <OtherAnswerItem
        v-for="answer in otherAnswers"
        :key="answer.id"
        :answer="answer"
        :isResolvedQuestion="isResolvedQuestion"
        @selectBestAnswer="onSelectBestAnswer"
      ></OtherAnswerItem>
      <br />
    </b-list-group>

    <div v-if="!isResolvedQuestion && !loggedIn">
      <h5 class="ml-3">
        <router-link :to="{ name: 'LogIn', query: { redirect: $route.path } }"
          >Log In to Answer</router-link
        >
      </h5>
      <br />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AnswerForm from '../components/QuestionsShow/AnswerForm'
import BestAnswerItem from '../components/QuestionsShow/BestAnswerItem'
import OtherAnswerItem from '../components/QuestionsShow/OtherAnswerItem'
import QuestionItem from '../components/QuestionsShow/QuestionItem'
import store from '../store'

export default {
  name: 'QuestionsShow',
  components: { AnswerForm, OtherAnswerItem, QuestionItem, BestAnswerItem },
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn',
      currentUser: 'auth/currentUser',
      question: 'question/question',
      bestAnswer: 'question/bestAnswer',
      otherAnswers: 'question/otherAnswers',
      answersCount: 'question/answersCount'
    }),
    answersHeading() {
      const pluralizedAnswer = this.answersCount === 1 ? 'Answer' : 'Answers'
      return `${this.answersCount} ${pluralizedAnswer}`
    },
    isResolvedQuestion() {
      return this.question.bestAnswer.id !== null
    },
    isCurrentUserQuestion() {
      return this.loggedIn && this.question.user.id === this.currentUser.id
    }
  },
  methods: {
    ...mapActions({
      selectBestAnswer: 'question/selectBestAnswer',
      deleteQuestion: 'question/deleteQuestion'
    }),
    onSelectBestAnswer(answerId) {
      this.selectBestAnswer({
        questionId: this.question.id,
        bestAnswerId: answerId
      })
    },
    onDeleteQuestion() {
      this.deleteQuestion(this.question.id)
      this.$router.push({ name: 'Home' }).catch(() => {})
    }
  },
  beforeRouteEnter(to, from, next) {
    const questionId = to.params.id
    store.dispatch('question/watchQuestion', questionId)
    store.dispatch('question/watchAnswers', questionId)
    next()
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch('question/resetQuestion')
    store.dispatch('question/resetAnswers')
    next()
  }
}
</script>

<style scoped>
.questions-show {
  max-width: 720px;
  margin: auto;
}
</style>
