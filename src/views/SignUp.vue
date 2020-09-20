<template>
  <div class="sign-up">
    <h1 class="text-center">Sign Up</h1>
    <b-alert :show="showError" variant="danger">{{ error }}</b-alert>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Name:">
        <b-form-input v-model="form.name" type="text" required></b-form-input>
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
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        name: '',
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
    ...mapActions(['fetchUser']),
    async onSubmit() {
      try {
        await this.signUp()
      } catch (err) {
        this.error = err.message
        return
      }
      await this.updateUser()
      this.$router.push('/my-page')
    },
    signUp() {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
    },
    updateUser() {
      return firebase
        .auth()
        .currentUser.updateProfile({ displayName: this.form.name })
        .then(() => {
          const newUser = {
            email: this.form.email,
            displayName: this.form.name
          }
          this.fetchUser(newUser)
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
