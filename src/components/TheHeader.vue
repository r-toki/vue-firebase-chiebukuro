<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-container>
        <b-navbar-nav>
          <b-navbar-brand :to="{ name: 'Home' }" class="header__link--home"
            >Home</b-navbar-brand
          >
          <b-nav-item :to="{ name: 'QuestionsNew' }">+Ask</b-nav-item>
        </b-navbar-nav>
        <template v-if="loggedIn">
          <b-navbar-nav class="ml-auto">
            <b-nav-item>My Page</b-nav-item>
            <b-nav-item @click="onClickLogOut">Log Out</b-nav-item>
          </b-navbar-nav>
        </template>
        <template v-else>
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'SignUp' }">Sign Up</b-nav-item>
            <b-nav-item :to="{ name: 'LogIn' }">Log In</b-nav-item>
          </b-navbar-nav>
        </template>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters({ loggedIn: 'users/loggedIn' })
  },
  methods: {
    ...mapActions({ logOut: 'users/fbAuthLogOut' }),
    onClickLogOut() {
      this.logOut().then(() => {
        if (this.$router.currentRoute.fullPath !== '/') {
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>
