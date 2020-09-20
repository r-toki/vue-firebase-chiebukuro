<template>
  <div id="app">
    <app-header></app-header>
    <router-view class="router-view" />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  components: { AppHeader }
}
</script>

<style lang="scss">
@import '~bootstrap';
@import '~bootstrap-vue';
</style>

<style scoped>
.router-view {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
</style>
