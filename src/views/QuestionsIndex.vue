<template>
  <div class="questions-index" v-if="!loading">
    <div class="d-flex justify-content-center">
      <b-button
        @click="onClickPrevButton()"
        variant="outline-primary"
        :disabled="!prevQuestionsExist"
        class="mr-3"
        >Prev</b-button
      >
      <b-button
        @click="onClickNextButton()"
        variant="outline-primary"
        :disabled="!nextQuestionsExist"
        >Next</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import store from '../store'

const PAGE_SIZE = 3

export default {
  name: 'QuestionsIndex',
  data() {
    return { loading: false }
  },
  computed: {
    ...mapGetters({
      nextQuestionsExist: 'questions/nextQuestionsExist',
      prevQuestionsExist: 'questions/prevQuestionsExist'
    }),
    resolved() {
      return this.$route.query.resolved === 'true'
    },
    pageSize() {
      return PAGE_SIZE
    }
  },
  methods: {
    ...mapActions({
      fetchNextPage: 'questions/fetchNextPage',
      fetchPrevPage: 'questions/fetchPrevPage'
    }),
    async onClickNextButton() {
      this.loading = true
      await this.fetchNextPage({
        resolved: this.resolved,
        pageSize: this.pageSize
      })
      this.loading = false
    },
    async onClickPrevButton() {
      this.loading = true
      await this.fetchPrevPage({
        resolved: this.resolved,
        pageSize: this.pageSize
      })
      this.loading = false
    }
  },
  beforeRouteEnter(to, from, next) {
    const resolved = to.query.resolved === 'true'
    store
      .dispatch('questions/fetchFirstPage', {
        resolved,
        pageSize: PAGE_SIZE
      })
      .then(() => {
        next()
      })
  },
  beforeRouteLeave(to, from, next) {
    store.dispatch('questions/resetState').then(() => {
      next()
    })
  }
}
</script>

<style scoped>
.questions-index {
  width: 480px;
  margin: auto;
}
</style>
