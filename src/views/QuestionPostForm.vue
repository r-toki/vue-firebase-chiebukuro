<template>
  <div class="question-post-form">
    <h1 class="text-center">Ask a Question</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Title:">
        <b-form-input v-model="form.title" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group label="Content:">
        <b-form-textarea
          v-model="form.content"
          required
          rows="10"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()

export default {
  name: 'QuestionPostForm',
  data() {
    return {
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.createQuestion()
    },

    createQuestion() {
      db.collection('questions').add({
        title: this.form.title,
        content: this.form.content
      })
    }
  }
}
</script>

<style scoped>
.question-post-form {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
</style>
