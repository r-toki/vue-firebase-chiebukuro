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
      <span>
        <router-link
          :to="{ name: 'UsersShow', params: { id: question.user.id } }"
        >
          {{ question.user.name }}
        </router-link>
        asked at
      </span>
      <span>{{ formatCreatedAt(question.createdAt || null) }}</span>
      <span v-if="isCurrentUserQuestion && !hasAnswers">
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'QuestionItem',
  props: {
    question: { type: Object },
    isResolvedQuestion: { type: Boolean },
    isCurrentUserQuestion: { type: Boolean }
  },
  computed: {
    ...mapGetters({ answersCount: 'question/answersCount' }),
    hasAnswers() {
      return this.answersCount !== 0
    }
  },
  methods: {
    ...mapActions('question', ['deleteQuestion']),
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
    },
    onClickTrashIcon() {
      if (window.confirm('Want to delete?')) {
        this.deleteQuestion(this.question.id).then(() => {
          this.$router.push({ name: 'Home' })
        })
      }
    }
  }
}
</script>

<style scoped>
.trash-icon:hover {
  color: #dc3545;
}
</style>
