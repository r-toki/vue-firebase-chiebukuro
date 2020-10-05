<template>
  <div class="questions-new">
    <h1 class="text-center mt-3">Ask a Question</h1>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Title:">
        <b-form-input v-model="title" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group label="Content:">
        <b-form-textarea v-model="content" rows="10"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Post</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'QuestionsNew',
  data() {
    return {
      title: this.$route.query.title || null,
      content: null
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'users/currentUser' })
  },
  methods: {
    ...mapActions({ createQuestion: 'questions/createQuestion' }),
    async onSubmit() {
      const question = await this.createQuestion({
        title: this.title,
        content: this.content,
        resolved: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: this.currentUser.id
      })
      this.$router.push({ name: 'QuestionsShow', params: { id: question.id } })
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
