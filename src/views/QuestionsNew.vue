<template>
  <div class="questions-new">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Title:">
        <b-form-input
          v-model="question.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from '@/firebaseInit'
const db = firebase.firestore()

export default {
  name: 'QuestionsNew',
  data() {
    return {
      question: {
        title: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      const newQuestion = {
        title: this.question.title,
        resolved: false
      }
      await this.createQuestion(newQuestion)
      this.question.title = ''
    },
    createQuestion(newQuestion) {
      return db.collection('questions').add(newQuestion)
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-new {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
</style>
