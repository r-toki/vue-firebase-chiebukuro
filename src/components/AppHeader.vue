<template>
  <div class="bg-dark">
    <div class="app-header__contents">
      <b-navbar type="dark">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/questions/new">+Ask</b-nav-item>
        </b-navbar-nav>
        <template v-if="loggedIn">
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/my-page">MyPage</b-nav-item>
            <b-nav-item @click.prevent="logOut">LogOut</b-nav-item>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/sign-up">SignUp</b-nav-item>
            <b-nav-item to="/log-in">LogIn</b-nav-item>
          </b-navbar-nav>
        </template>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',

  computed: {
    ...mapGetters({ currentUser: 'users/currentUser' }),
    loggedIn() {
      return this.currentUser !== null
    }
  },

  methods: {
    ...mapActions({ logOut: 'users/logOut' })
  }
}
</script>

<style scoped>
.app-header__contents {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
</style>
