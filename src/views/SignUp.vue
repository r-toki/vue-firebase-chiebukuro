<template>
  <div class="sign-up">
    <h1 class="text-center">Sign Up</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Name:">
        <b-form-input
          v-model="form.displayName"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
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
      <b-form-group label="Confirmation:">
        <b-form-input
          v-model="form.confirmation"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Sign Up</b-button>
    </b-form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        displayName: '',
        email: '',
        password: '',
        confirmation: ''
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
      if (this.form.password !== this.form.confirmation) {
        this.error = 'Password and Confirmation do not match.'
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.displayName
            })
            .then(() => {})
          this.$router.push('/my-page')
        })
        .catch(err => {
          this.error = err.message
        })
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
