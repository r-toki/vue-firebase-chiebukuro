<template>
  <div class="questions-index">
    <b-list-group>
      <b-list-group-item v-for="question in questions" :key="question.id">
        {{ question.title }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'QuestionsIndex',
  methods: {
    ...mapActions(['questions/fetchAll'])
  },
  computed: {
    ...mapGetters({ questions: 'questions/all' })
  },
  created() {
    this['questions/fetchAll']()
  }
}
</script>

<style lang="scss" scoped>
.questions-index {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
</style>
