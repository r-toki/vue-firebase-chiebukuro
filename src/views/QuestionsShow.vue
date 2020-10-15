<template>
  <div class="questions-show">
    <QuestionItem :question="question" v-if="question !== null"></QuestionItem>
    <br />

    <AnswerForm :questionId="questionId"></AnswerForm>
    <br />

    <b-list-group>
      <OtherAnswerItem
        v-for="answer in answers"
        :key="answer.id"
        :answer="answer"
      ></OtherAnswerItem>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AnswerForm from '../components/questions-show/AnswerForm'
import OtherAnswerItem from '../components/questions-show/OtherAnswerItem'
import QuestionItem from '../components/questions-show/QuestionItem'
import store from '../store'

export default {
  name: 'QuestionsShow',
  components: { AnswerForm, OtherAnswerItem, QuestionItem },
  computed: {
    ...mapGetters({
      question: 'question/question',
      answers: 'question/answers'
    }),
    questionId() {
      return this.$route.params.id
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
