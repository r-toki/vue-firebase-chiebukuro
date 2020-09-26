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
      <b-form-group>
        <b-form-textarea
          v-model="question.content"
          required
          rows="10"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'QuestionsNew',
  data() {
    return {
      question: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    ...mapActions({ addQuestion: 'questions/addQuestion' }),
    async onSubmit() {
      const newQuestion = this.createNewQuestionFromForm()
      await this.addQuestion(newQuestion)
      this.clearForm()
      this.$router.push('/')
    },
    createNewQuestionFromForm() {
      const newQuestion = {
        title: this.question.title,
        content: this.question.content,
        createdAt: Date.now(),
        resolved: false
      }
      return newQuestion
    },
    clearForm() {
      this.question = {
        title: '',
        content: ''
      }
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
