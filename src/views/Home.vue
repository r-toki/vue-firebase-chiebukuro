<template>
  <div class="home">
    <h1 class="text-center mt-3">Home</h1>

    <h2>Ask a Question!</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group>
        <b-form-textarea
          v-model="questionForm.content"
          rows="2"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Ask</b-button>
    </b-form>

    <h2 class="mt-3">Resolved Questions</h2>
    <b-list-group>
      <b-list-group-item></b-list-group-item>
    </b-list-group>

    <h2 class="mt-3">Unresolved Questions</h2>
    <b-list-group>
      <b-list-group-item></b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      questionForm: {
        content: ''
      }
    }
  },

  methods: {
    onSubmit() {
      this.$router.push({
        path: '/questions/new',
        query: { content: this.questionForm.content }
      })
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
</style>
