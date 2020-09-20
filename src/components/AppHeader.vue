<template>
  <div class="bg-dark">
    <div class="app-header__contents">
      <b-navbar type="dark">
        <b-navbar-nav>
          <b-nav-item href="/"> Home </b-nav-item>
          <b-nav-item href="/"> +Ask </b-nav-item>
        </b-navbar-nav>
        <template v-if="user.loggedIn">
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/"> SignUp </b-nav-item>
            <b-nav-item href="/"> LogIn </b-nav-item>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/"> MyPage </b-nav-item>
            <b-nav-item href="/"> LogOut </b-nav-item>
          </b-navbar-nav>
        </template>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header__contents {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
</style>
