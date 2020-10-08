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
        <div>
          <span>
            <router-link
              :to="{ name: 'UsersShow', params: { id: question.userId } }"
              >{{ findUserFromUsers(question.userId).name }}</router-link
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
  computed: {
    ...mapGetters({
      questions: 'questions/questions',
      findUserFromUsers: 'users/findUserFromUsers'
    })
  },
  methods: {
    ...mapActions({
      watchQuestions: 'questions/watchQuestions',
      watchUsers: 'users/watchUsers'
    }),
    formatCreatedAt(createdAt) {
      return moment(createdAt.toDate()).format('YYYY/MM/DD HH:mm')
    }
  },
  async mounted() {
    await this.watchQuestions({
      resolved: this.$route.query.resolved === 'true'
    })
    await this.watchUsers()
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
