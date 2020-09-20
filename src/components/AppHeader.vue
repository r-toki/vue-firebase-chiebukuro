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
            <b-nav-item href="/my-page"> MyPage </b-nav-item>
            <b-nav-item @click.prevent="logOut"> LogOut </b-nav-item>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/sign-up"> SignUp </b-nav-item>
            <b-nav-item href="/log-in"> LogIn </b-nav-item>
          </b-navbar-nav>
        </template>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters({ user: 'user' })
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    }
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
