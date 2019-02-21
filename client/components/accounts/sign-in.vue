<template>
  <div id="sign-in-start">
    <h1>Sign in</h1>
    <p>
      or <nuxt-link to="/accounts/create">
        create an account
      </nuxt-link>
    </p>
    <verifyUsername :on-submit="handleSubmit" />
    <hr role="presentation">
    <a href="/api/accounts/google/start">Sign in with Google</a>
  </div>
</template>

<script>
import verifyUsername from './verify-username'
export default {
  name: 'SignIn',
  components: { verifyUsername },
  methods: {
    async handleSubmit (usernameInput) {
      /** Verify given username with server. */
      let account = await this.$axios.$post('/api/accounts/find', {
        username: usernameInput
      })
      if (!account) {
        /** If no account is found, show an error message. */
        // Insert error message logic here.
      } else if (account.auth.provider !== 'Local') {
        /** If the account exists and it's not local account, send them to their account provider. */
        this.$store.commit('accounts/UPDATE_USER', account)
        this.$store.commit('accounts/UPDATE_SIGNINSTATE', 3)
        // Insert account provider logic here.
      } else if (account.auth.provider === 'Local') {
        /** If the account exists and it's a local account, let them enter their password. */
        this.$store.commit('accounts/UPDATE_USER', account)
        this.$store.commit('accounts/UPDATE_SIGNINSTATE', 1)
      } else {
        /** If we've made it here, something has gone wrong. Handle the error. */
        // Uh oh. Handle the error.
      }
    }
  }
}
</script>
