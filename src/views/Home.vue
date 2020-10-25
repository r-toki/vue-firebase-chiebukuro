<template>
  <div class="home">
    <router-link :to="{ name: 'QuestionsIndex', query: { resolved: 'true' } }"
      >Resolved</router-link
    >
    <br />
    <router-link :to="{ name: 'QuestionsIndex', query: { resolved: 'false' } }"
      >Unresolved</router-link
    >
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  max-width: 720px;
  margin: auto;
}
</style>
