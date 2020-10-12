<template>
  <div class="questions-new">
    <h1 class="text-center">Post a Question</h1>
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
import store from '../store'
import { mapActions, mapGetters } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'QuestionsNew',
  data() {
    return {
      title: null,
      content: null
    }
  },
  computed: {
    ...mapGetters({ currentUser: 'users/currentUser' })
  },
  methods: {
    ...mapActions({ fbQuestionCreate: 'questions/fbQuestionCreate' }),
    onSubmit() {
      this.fbQuestionCreate({
        title: this.title,
        content: this.content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: this.currentUser.id,
        bestAnswerId: null
      }).then(question => {
        this.$router.push({
          name: 'QuestionsShow',
          params: { id: question.id }
        })
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters['users/loggedIn']) {
      next()
    } else {
      next({ name: 'LogIn', query: { redirect: to.fullPath } })
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-new {
  max-width: 480px;
  margin: auto;
}
</style>
