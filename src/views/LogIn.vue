<template>
  <div class="log-in">
    <h1 class="text-center mt-3">Log In</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    }
  },
  methods: {
    ...mapActions({ logIn: 'users/logIn' }),
    async onSubmit() {
      try {
        await this.logIn({
          email: this.email,
          password: this.password
        })
      } catch (err) {
        this.error = 'Invalid email and password.'
      }
    }
  }
}
</script>

<style scoped>
.log-in {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
</style>
