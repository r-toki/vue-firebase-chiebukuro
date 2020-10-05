<template>
  <div id="app">
    <app-header></app-header>
    <router-view />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'

export default {
  name: 'App',
  components: { AppHeader }
}
</script>

<style lang="scss">
@import '~bootstrap';
@import '~bootstrap-vue';
</style>
