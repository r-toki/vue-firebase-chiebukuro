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
      <span v-if="isCurrentUserQuestion && answersCount === 0">
        /
        <b-icon
          icon="trash2-fill"
          class="trash-icon"
          @click.prevent="onClickTrashIcon"
        ></b-icon>
      </span>
    </div>
  </b-card>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionItem',
  props: {
    question: { type: Object },
    isResolvedQuestion: { type: Boolean },
    isCurrentUserQuestion: { type: Boolean }
  },
  computed: {
    ...mapGetters({ answersCount: 'question/answersCount' })
  },
  methods: {
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
    },
    onClickTrashIcon() {
      this.$emit('deleteQuestion')
    }
  }
}
</script>

<style scoped>
.trash-icon:hover {
  color: #343a40;
}
</style>
