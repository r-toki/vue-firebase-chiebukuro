<template>
  <div class="sign-up">
    <h1 class="text-center">Sign Up</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit()">
      <b-form-group label="Name:">
        <b-form-input v-model="name" type="text" required></b-form-input>
      </b-form-group>
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
      <b-button type="submit" variant="primary">Sign Up</b-button>
    </b-form>
    <br />
    <router-link :to="{ name: 'LogIn', query: { redirect: redirect } }"
      >Have an account?</router-link
    >
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import * as fb from '../common/firebase.config'

export default {
  name: 'SignUp',
  data() {
    return {
      name: null,
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
    ...mapActions({
      signUp: 'auth/signUp'
    }),
    onSubmit() {
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          const id = res.user.uid
          return fb.usersCollection.doc(id).set({ name: this.name })
        })
        .then(() => {
          setImmediate(() => {
            this.$router.push({ path: this.redirect })
          })
        })
        .catch(error => {
          this.error = error.message
        })
    }
  }
}
</script>

<style scoped>
.sign-up {
  max-width: 480px;
  margin: auto;
}
</style>
