<template>
  <div class="questions-new">
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Title:">
        <b-form-input
          v-model="questionForm.title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Content:">
        <b-form-textarea
          v-model="questionForm.content"
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
      questionForm: {
        title: '',
        content: ''
      }
    }
  },

  methods: {
    ...mapActions({ addQuestion: 'questions/addQuestion' }),

    async onSubmit() {
      const question = this.createQuestionFromForm()
      await this.addQuestion(question)
      this.clearForm()
      this.$router.push('/')
    },

    createQuestionFromForm() {
      const question = {
        title: this.questionForm.title,
        content: this.questionForm.content,
        createdAt: Date.now(),
        resolved: false
      }
      return question
    },

    clearForm() {
      this.questionForm = {
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
