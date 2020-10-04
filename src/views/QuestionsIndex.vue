<template>
  <div class="questions-index">
    <h1 class="text-center mt-3">Questions Index</h1>
    <b-list-group>
      <b-list-group-item v-for="question in questions" :key="question.id">
        <h5>
          <router-link
            :to="{ name: 'QuestionsShow', params: { id: question.id } }"
            >{{ question.title }}</router-link
          >
        </h5>
        <div class="text-muted">
          <span>
            <router-link
              :to="{ name: 'UsersShow', params: { id: question.user.id } }"
              >{{ question.user.name }}</router-link
            >
          </span>
          asked at
          {{ formatCreatedAt(question.createdAt) }}
        </div>
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
      const date = createdAt.toDate()
      const formatDate = moment(date).format('YYYY/MM/DD HH:mm')
      return formatDate
    }
  },
  computed: {
    ...mapGetters({ questions: 'questions/questions' })
  },
  async mounted() {
    await this.fetchQuestions({
      resolved: this.$route.query.resolved === 'true'
    })
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
