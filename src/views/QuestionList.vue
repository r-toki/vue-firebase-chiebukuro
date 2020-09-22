<template>
  <div>
    <h1 class="text-center">Question List</h1>
    <h1 class="text-center">{{ $route.query.type }}</h1>
    <b-list-group>
      <b-list-group-item
        v-for="question in questions"
        :key="question.id"
        :href="'/question-detail/' + question.id"
        >{{ question.title }}</b-list-group-item
      >
    </b-list-group>
  </div>
</template>

<script>
import firebase from '@/firebaseInit'
const db = firebase.firestore()

export default {
  name: 'QuestionList',
  data() {
    return {
      questions: []
    }
  },
  methods: {
    getQuestions() {
      const resolved = this.$route.query.resolved === 'true'
      db.collection('questions')
        .where('resolved', '==', resolved)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.questions.push({ id: doc.id, title: doc.data().title })
          })
        })
    }
  },
  created() {
    this.getQuestions()
  }
}
</script>
