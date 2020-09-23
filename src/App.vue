<template>
  <div id="app">
    <div class="router-link-nav">
      <router-link to="/questions">Questions Index</router-link> |
      <router-link to="/questions/new">Questions New</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~bootstrap';
@import '~bootstrap-vue';
</style>

<style lang="scss" scoped>
.router-link-nav {
  padding: 30px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
