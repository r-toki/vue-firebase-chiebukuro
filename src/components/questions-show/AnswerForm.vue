<template>
  <div>
    <h5>Your Answer</h5>
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <b-form-textarea rows="5" required v-model="answer"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

import * as fb from '../../common/firebase.config'

export default {
  name: 'AnswerForm',
  props: { questionId: { type: String, required: true } },
  data() {
    return { answer: null }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      question: 'question/question'
    })
  },
  methods: {
    onSubmit() {
      fb.answersCollection
        .add({
          content: this.answer,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          user: { id: this.currentUser.id },
          question: { id: this.question.id }
        })
        .finally(() => {
          this.answer = null
        })
    }
  }
}
</script>
