<template>
  <div class="questions-show">
    <b-card :title="question.title" class="mt-5">
      <p>{{ question.content }}</p>
      <div class="text-muted">
        <span>
          <router-link
            :to="{ name: 'UsersShow', params: { id: question.userId } }"
            >{{ findUserFromUsers(question.userId).name }}</router-link
          >
        </span>
        asked at
        {{ formatCreatedAt(question.createdAt) }}
      </div>
    </b-card>
    <br />

    <h5>Answers Count</h5>
    <b-list-group>
      <b-list-group-item v-for="answer in answersOfQuestion" :key="answer.id">
        <div>{{ answer.content }}</div>
        <div class="text-muted">
          <span>
            <router-link
              :to="{ name: 'UsersShow', params: { id: answer.userId } }"
              >{{ findUserFromUsers(answer.userId).name }}</router-link
            >
          </span>
          answerd at
          {{ formatCreatedAt(answer.createdAt) }}
        </div>
      </b-list-group-item>
    </b-list-group>
    <br />

    <h5>Your answer</h5>
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <b-form-textarea rows="5" required v-model="answer"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import firebase from 'firebase'

export default {
  name: 'QuestionsShow',
  computed: {
    ...mapGetters({
      question: 'questions/question',
      answersOfQuestion: 'answers/answersOfQuestion',
      findUserFromUsers: 'users/findUserFromUsers',
      currentUser: 'users/currentUser'
    }),
    questionId() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      answer: null
    }
  },
  methods: {
    ...mapActions({
      watchQuestion: 'questions/watchQuestion',
      watchUsers: 'users/watchUsers',
      watchAnswersOfQuestion: 'answers/watchAnswersOfQuestion',
      createAnswer: 'answers/createAnswer'
    }),
    formatCreatedAt(createdAt) {
      return moment(createdAt.toDate()).format('YYYY/MM/DD HH:mm')
    },
    async onSubmit() {
      this.createAnswer({
        content: this.answer,
        best: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: this.currentUser.id,
        questionId: this.questionId
      })
      this.answer = null
    }
  },
  async created() {
    await this.watchQuestion({ id: this.questionId })
    await this.watchUsers()
    await this.watchAnswersOfQuestion({ questionId: this.questionId })
  }
}
</script>

<style scoped>
.questions-show {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
</style>
