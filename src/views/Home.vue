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
      <b-list-group-item
        v-for="resolvedQuestion in resolvedQuestions"
        :key="resolvedQuestion.id"
        >{{ resolvedQuestion.title }}</b-list-group-item
      >
      <b-list-group-item>
        <router-link to="/questions?resolved=true" class="float-right"
          >Resolved Questions</router-link
        >
      </b-list-group-item>
    </b-list-group>

    <h2 class="mt-3">Unresolved Questions</h2>
    <b-list-group>
      <b-list-group-item
        v-for="unresolvedQuestion in unresolvedQuestions"
        :key="unresolvedQuestion.id"
        >{{ unresolvedQuestion.title }}</b-list-group-item
      >
      <b-list-group-item>
        <router-link to="/questions?resolved=false" class="float-right"
          >Unresolved Questions</router-link
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      questionForm: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      resolvedQuestions: 'home/resolvedQuestions',
      unresolvedQuestions: 'home/unresolvedQuestions'
    })
  },
  methods: {
    ...mapActions({
      fetchResolvedQuestions: 'home/fetchResolvedQuestions',
      fetchUnresolvedQuestions: 'home/fetchUnresolvedQuestions'
    }),
    onSubmit() {
      this.$router.push({
        path: '/questions/new',
        query: { title: this.questionForm.content }
      })
    }
  },
  async mounted() {
    await this.fetchResolvedQuestions()
    await this.fetchUnresolvedQuestions()
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
