<template>
  <b-card>
    <div class="mb-3">
      <b-badge variant="warning" class="text-white" v-if="isResolvedQuestion"
        >Resolved</b-badge
      >
      <b-badge variant="dark" v-else>Unresolved</b-badge>
    </div>
    <h4 class="mb-3">{{ question.title }}</h4>
    <b-card-text style="white-space: pre-line;">{{
      question.content
    }}</b-card-text>
    <div class="text-muted">
      <span>{{ question.user.name }} asked at </span>
      <span>{{ formatCreatedAt(question.createdAt || null) }}</span>
    </div>
  </b-card>
</template>

<script>
import moment from 'moment'

export default {
  name: 'QuestionItem',
  props: {
    question: { type: Object },
    isResolvedQuestion: { type: Boolean },
    isCurrentUserQuestion: { type: Boolean }
  },
  methods: {
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
    }
  }
}
</script>
