<template>
  <div class="log-in">
    <h1 class="text-center">Log In</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit()">
      <b-form-group label="Email:">
        <b-form-input v-model="email" type="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Log In</b-button>
    </b-form>
    <br />
    <router-link :to="{ name: 'SignUp', query: { redirect: redirect } }"
      >Need an account?</router-link
    >
  </div>
</template>

<script>
import * as fb from '../common/firebase.config'

export default {
  name: 'LogIn',
  data() {
    return {
      email: null,
      password: null,
      error: null
    }
  },
  computed: {
    showError() {
      return this.error !== null
    },
    redirect() {
      return this.$route.query.redirect || '/'
    }
  },
  methods: {
    onSubmit() {
      fb.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // or setTimeout ?
          setImmediate(() => {
            this.$router.push({ path: this.redirect })
          })
        })
        .catch(error => {
          if (error) {
            this.error = error.message
          }
        })
    }
  }
}
</script>

<style scoped>
.log-in {
  max-width: 480px;
  margin: auto;
}
</style>
