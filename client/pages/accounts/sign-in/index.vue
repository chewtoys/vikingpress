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
      <form-field
        label="Email or username"
        :error="error"
      >
        <b-input
          v-model.trim="usernameInput"
          class="vv-auth-input"
        />
      </form-field>
      <button class="button is-info">
        Next
      </button>
    </form>
    <hr role="presentation">
    <a href="/api/google/start">Sign in with Google</a>
  </div>
</template>

<script>
import formField from '~/components/global/form-field.vue'

export default {
  layout: 'accounts',
  head () {
    return {
      title: `Sign In | The Viking Voice`
    }
  },
  components: {
    formField
  },
  data () {
    return {
      usernameInput: '',
      error: {
        exists: false,
        message: ''
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.accounts.user
    },
    signInState () {
      return this.$store.state.accounts.signInState
    }
  },
  fetch ({ store }) {
    store.dispatch('GET_SIGNIN_STATE')
    store.dispatch('FETCH_USER')
  },
  methods: {
    async handleSubmit (usernameInput) {
      if (!usernameInput) {
        return this.error = {
          exists: true,
          message: 'Enter an email address or username.'
        }
      }
      this.$store.commit('START_LOADING')
      /** Verify given username with server. */
      let response = await this.$axios.$post('/api/accounts/sign-in/find-account', {
        username: usernameInput
      })
      this.$store.commit('STOP_LOADING')
      if (response.status !== 'success' || typeof response.data.authProvider === 'undefined') {
        this.error = {
          exists: true,
          message: response.message || 'Sorry, an unknown error occurred.'
        }
      } else {
        let account = response.data
        if (account.authProvider.indexOf('Local') === -1) {
          /** If the account exists and it's not local account, send them to their account provider. */
          this.$store.commit('UPDATE_USER', account)
          this.$router.push('/accounts/sign-in/provider')
        } else if (account.authProvider.indexOf('Local') !== -1) {
          /** If the account exists and it's a local account, let them enter their password. */
          this.$store.commit('UPDATE_USER', account)
          this.$router.push('/accounts/sign-in/password')
        }
      }
    }
  }
}
</script>

<style>
</style>
