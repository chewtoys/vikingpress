<template>
  <div>
    <h1 class="title">
      Sign in
    </h1>
    <p class="subtitle">
      or <nuxt-link to="/accounts/create">
        create an account
      </nuxt-link>
    </p>

    <form @submit.prevent="handleSubmit(usernameInput)">
      <b-field label="Email or username">
        <b-input
          v-model.trim="usernameInput"
          class="vv-auth-input"
        />
      </b-field>
      <button class="button is-info">
        Next
      </button>
    </form>
    <hr role="presentation">
    <a href="/api/accounts/google/start">Sign in with Google</a>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    />
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      usernameInput: '',
      isLoading: false
    }
  },
  methods: {
    async handleSubmit (usernameInput) {
      this.isLoading = true
      /** Verify given username with server. */
      let account = await this.$axios.$post('/api/accounts/find', {
        username: usernameInput
      })
      if (!account) {
        /** If no account is found, show an error message. */
        // Insert error message logic here.
      } else if (account.authProvider.indexOf('Local') === -1) {
        /** If the account exists and it's not local account, send them to their account provider. */
        this.$store.commit('accounts/UPDATE_USER', account)
        this.$store.commit('accounts/UPDATE_SIGNINSTATE', 3)
        // Insert account provider logic here.
      } else if (account.authProvider.indexOf('Local') !== -1) {
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
