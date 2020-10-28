<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-container>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Home' }" class="mr-1">Home</b-nav-item>
          <b-navbar-brand :to="{ name: 'QuestionsNew' }">+Ask</b-navbar-brand>
        </b-navbar-nav>
        <template v-if="loggedIn">
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              :to="{ name: 'UsersShow', params: { id: currentUser.id } }"
              >My Page</b-nav-item
            >
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters({
      loggedIn: 'auth/loggedIn',
      currentUser: 'auth/currentUser'
    })
  },
  methods: {
    ...mapActions({ logOut: 'auth/logOut' }),
    onClickLogOut() {
      this.logOut()
    }
  }
}
</script>
