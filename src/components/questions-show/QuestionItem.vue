<template>
  <b-card>
    <h4 class="card-title">{{ question.title }}</h4>
    <b-card-text>{{ question.content }}</b-card-text>
    <div class="text-muted">
      <span>{{ question.user.name }} asked at </span>
      <span>{{ formatCreatedAt(question.createdAt) }}</span>
    </div>
  </b-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Question',
  props: { question: { type: Object, required: true } },
  methods: {
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
    }
  }
}
</script>
