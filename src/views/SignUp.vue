<template>
  <div class="sign-up">
    <h1 class="text-center mt-3">Sign Up</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
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
      <b-form-group label="Confirmation:">
        <b-form-input
          v-model="confirmation"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign Up</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignUp',
  data() {
    return {
      name: null,
      email: null,
      password: null,
      confirmation: null,
      error: null
    }
  },
  computed: {
    showError() {
      return this.error !== null
    }
  },
  methods: {
    ...mapActions({ signUp: 'users/signUp' }),
    async onSubmit() {
      if (!this.checkConfirmation()) {
        this.error = 'Invalid password confirmation.'
        return
      }
      try {
        await this.signUp({
          email: this.email,
          password: this.password,
          name: this.name
        })
      } catch (err) {
        this.error = err.message
      }
    },
    checkConfirmation() {
      return this.password === this.confirmation
    }
  }
}
</script>

<style scoped>
.sign-up {
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
</style>
