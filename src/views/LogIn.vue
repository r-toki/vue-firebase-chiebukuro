<template>
  <div class="log-in">
    <h1 class="text-center">Log In</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Email:">
        <b-form-input v-model="form.email" type="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:">
        <b-form-input
          v-model="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Log In</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'LogIn',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  computed: {
    showError() {
      return this.error !== null
    }
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.push('/my-page')
        })
        .catch(() => {
          this.error = 'Invalid Email and Password.'
        })
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
