<template>
  <b-list-group-item>
    <b-badge variant="warning" class="text-white mb-2">
      Best Answer
    </b-badge>
    <div style="white-space: pre-line;">{{ answer.content }}</div>
    <div class="text-muted">
      <span>
        <router-link
          :to="{ name: 'UsersShow', params: { id: answer.user.id } }"
        >
          {{ answer.user.name }}
        </router-link>
        answered at
      </span>
      <span>{{ formatCreatedAt(answer.createdAt) }}</span>
    </div>
  </b-list-group-item>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BestAnswerItem',
  props: {
    answer: { type: Object, required: true }
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
