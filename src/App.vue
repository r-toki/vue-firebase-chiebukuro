<template>
  <div id="app">
    <TheHeader class="mb-3" />
    <router-view />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'

export default {
  components: { TheHeader }
}
</script>

<style lang="scss">
@import '~bootstrap';
@import '~bootstrap-vue';
@import url(https://fonts.googleapis.com/earlyaccess/notosansjp.css);
#app {
  font-family: 'Noto Sans JP';
}
</style>
