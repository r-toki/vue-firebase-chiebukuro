<template>
  <div class="questions-index">
    <b-list-group>
      <b-list-group-item v-for="question in questions" :key="question.id">
        <h5>{{ question.title }}</h5>
        <div class="text-muted">{{ formatCreatedAt(question.createdAt) }}</div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'QuestionsIndex',

  methods: {
    ...mapActions({ fetchQuestions: 'questions/fetchQuestions' }),

    formatCreatedAt(createdAt) {
      const formatDate = moment(createdAt).format('YYYY/MM/DD HH:mm')
      return formatDate
    }
  },

  computed: {
    ...mapGetters({ questions: 'questions/questions' })
  },

  async created() {
    await this.fetchQuestions()
  }
}
</script>

<style lang="scss" scoped>
.questions-index {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
</style>
