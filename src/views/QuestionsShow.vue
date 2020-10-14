<template>
  <div class="questions-show">
    <b-card>
      <div class="mb-3">
        <b-badge variant="warning" class="text-white" v-if="isQuestionResolved"
          >Resolved</b-badge
        >
        <b-badge variant="dark" v-else>Unresolved</b-badge>
      </div>
      <h4 class="card-title">{{ question.title }}</h4>
      <b-card-text>{{ question.content }}</b-card-text>
      <div class="text-muted">
        <span>{{ question.user.name }} asked at </span>
        <span>{{ formatCreatedAt(question.createdAt) }}</span>
        <span
          v-if="isYourQuestion && !isQuestionResolved && answers.length === 0"
        >
          /
          <b-icon
            icon="trash2-fill"
            class="trash-icon"
            @click.prevent="deleteQuestion"
          ></b-icon
        ></span>
      </div>
    </b-card>
    <br />

    <h5>Answers</h5>
    <b-list-group>
      <b-list-group-item v-for="answer in answers" :key="answer.id">
        <b-badge
          variant="warning"
          class="text-white mb-3"
          v-if="isBestAnswer(answer.id)"
          >Best Answer</b-badge
        >
        <div>{{ answer.content }}</div>
        <div class="text-muted">
          <span>{{ answer.user.name }} answerd at </span
          ><span>{{ formatCreatedAt(answer.createdAt) }} </span>
          <span v-if="!isQuestionResolved && isYourQuestion">
            /
            <b-icon
              icon="star-fill"
              class="star-icon"
              @click.prevent="selectBestAnswer(answer)"
            ></b-icon
          ></span>
          <span v-if="!isQuestionResolved && isYourAnswer(answer.userId)">
            /
            <b-icon
              icon="trash2-fill"
              class="trash-icon"
              @click.prevent="deleteAnswer(answer)"
            ></b-icon
          ></span></div
      ></b-list-group-item>
    </b-list-group>
    <br />

    <div v-if="!isQuestionResolved">
      <div v-if="loggedIn">
        <h5>Your Answer</h5>
        <b-form @submit.prevent="onSubmit">
          <b-form-group>
            <b-form-textarea
              rows="5"
              required
              v-model="answer"
            ></b-form-textarea>
          </b-form-group>
          <b-button type="submit" variant="primary">Post</b-button>
        </b-form>
      </div>
      <div v-else>
        <h5>
          <router-link :to="{ name: 'LogIn', query: { redirect: $route.path } }"
            >Log In to Answer</router-link
          >
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

import store from '../store'

export default {
  name: 'QuestionShow',
  data() {
    return { answer: null }
  },
  computed: {
    ...mapGetters({
      question: 'questions/question',
      answers: 'answers/answers',
      currentUser: 'users/currentUser',
      loggedIn: 'users/loggedIn'
    }),
    id() {
      return this.$route.params.id
    },
    isQuestionResolved() {
      return this.question.bestAnswerId !== null
    },
    isYourQuestion() {
      return this.currentUser && this.question.userId === this.currentUser.id
    }
  },
  methods: {
    ...mapActions({
      fbAnswerCreate: 'answers/fbAnswerCreate'
    }),
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
      // TODO: 回答を追加後にエラーになる
      return ''
    },
    isYourAnswer(userId) {
      return this.currentUser && userId === this.currentUser.id
    },
    isBestAnswer(answerId) {
      return answerId === this.question.bestAnswerId
    },
    onSubmit() {
      this.fbAnswerCreate({
        content: this.answer,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: this.currentUser.id,
        questionId: this.id
      })
      this.answer = null
    },
    selectBestAnswer(answer) {
      this.question.ref.update({ bestAnswerId: answer.id })
    },
    deleteAnswer(answer) {
      answer.ref.delete()
    },
    deleteQuestion() {
      // TODO: 質問削除後にエラーになる
      this.question.ref.delete().then(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch('questions/fbQuestionWatch', to.params.id),
      store.dispatch('answers/fbAnswersWatch', to.params.id)
    ]).then(() => {
      next()
    })
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch('questions/resetQuestion')
    store.dispatch('answers/resetAnswers')
    next()
  }
}
</script>

<style scoped>
.questions-show {
  max-width: 720px;
  margin: auto;
}
.star-icon:hover {
  color: #ffc107;
}
.trash-icon:hover {
  color: #343a40;
}
</style>
