<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-container>
        <b-navbar-nav>
          <b-navbar-brand :to="{ name: 'Home' }" class="header__link--home"
            >Home</b-navbar-brand
          >
          <b-nav-item>+Ask</b-nav-item>
        </b-navbar-nav>
        <template v-if="isLoggedIn">
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
    ...mapGetters({ isLoggedIn: 'users/isLoggedIn' })
  },
  methods: {
    ...mapActions({ logOut: 'users/fbAuthLogOut' }),
    onClickLogOut() {
      this.logOut().then(() => {
        if (this.$router.currentRoute.name !== 'Home') {
          this.$router.push({ name: 'Home' })
        }
      })
    }
  }
}
</script>
