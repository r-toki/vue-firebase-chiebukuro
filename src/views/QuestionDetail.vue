<template>
  <div>
    <b-card :title="this.question.title">
      <b-card-text>
        {{ this.question.content }}
      </b-card-text>
    </b-card>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Your Answer: ">
        <b-form-textarea v-model="answer.content" required></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Answer</b-button>
    </b-form>
    <b-list-group>
      <b-list-group-item v-for="answer in answers" :key="answer.id">{{
        answer.content
      }}</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import firebase from '@/firebaseInit'
const db = firebase.firestore()

export default {
  name: 'QuestionDetail',
  data() {
    return {
      question: {
        id: '',
        title: '',
        content: ''
      },
      answer: {
        content: ''
      },
      answers: []
    }
  },
  methods: {
    onSubmit() {
      this.createAnswer()
    },
    createAnswer() {
      db.collection('answers')
        .add({
          content: this.answer.content,
          best: false,
          question_id: this.question.id
        })
        .then(() => {
          this.answer = { content: '' }
        })
    }
  },
  created() {
    db.collection('questions')
      .doc(this.$route.params.id)
      .get()
      .then(doc => {
        this.question.id = doc.id
        this.question.title = doc.data().title
        this.question.content = doc.data().content
      })
    db.collection('answers')
      .where('question_id', '==', this.$route.params.id)
      .onSnapshot(querySnapshot => {
        this.answers = []
        querySnapshot.docs.forEach(doc => {
          this.answers.push({ id: doc.id, content: doc.data().content })
        })
      })
  }
}
</script>
