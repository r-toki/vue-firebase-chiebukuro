<template>
  <b-list-group-item>
    <div style="white-space: pre-line;">{{ answer.content }}</div>
    <div class="text-muted">
      <span>{{ answer.user.name }} answered at </span>
      <span>{{ formatCreatedAt(answer.createdAt) }}</span>
      <span v-if="!isResolvedQuestion">
        /
        <b-icon
          icon="star-fill"
          class="star-icon"
          @click.prevent="onClickStarIcon"
        ></b-icon
      ></span>
      <span v-if="!isResolvedQuestion && isCurrentUserAnswer">
        /
        <b-icon
          icon="trash2-fill"
          class="trash-icon"
          @click.prevent="onClickTrashIcon"
        ></b-icon>
      </span>
    </div>
  </b-list-group-item>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

import * as fb from '../../common/firebase.config'

export default {
  name: 'OhterAnswerItem',
  props: {
    answer: { type: Object, required: true },
    isResolvedQuestion: { type: Boolean, required: true }
  },
  computed: {
    ...mapGetters({ currentUser: 'auth/currentUser' }),
    isCurrentUserAnswer() {
      return this.answer.user.id === this.currentUser.id
    }
  },
  methods: {
    formatCreatedAt(createdAt) {
      if (createdAt) {
        return moment(createdAt.toDate()).format('YYYY-MM-DD HH:mm')
      }
    },
    onClickStarIcon() {
      // best asnwer を選ぶ処理 = question.bestAnswerId を更新する処理
      // は QuestionsShow 内で行うのが適当
      this.$emit('selectBestAnswer', this.answer.id)
    },
    onClickTrashIcon() {
      fb.answersCollection.doc(this.answer.id).delete()
    }
  }
}
</script>

<style scoped>
.star-icon:hover {
  color: #ffc107;
}
.trash-icon:hover {
  color: #343a40;
}
</style>
