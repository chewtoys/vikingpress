<template>
  <div>
    <h1
      class="title"
      v-html="user.welcomeMessage"
    />
    <p class="subtitle">
      Please enter your password.
    </p>
    <form @submit.prevent="signIn">
      <b-field label="Password">
        <b-input
          v-model="passwordInput"
          class="vv-auth-input"
        />
      </b-field>
      <div class="is-clearfix vv-auth-input">
        <a
          href="#"
          class="is-pulled-left is-small"
          title="Reset my password"
          @click="resetPassword"
        >
          Forgot your password?
        </a>
        <button class="button is-info is-pulled-right">
          Next
        </button>
      </div>
    </form>
    <hr role="presentation">
    <a
      href="#"
      title="Go back"
      @click="goBack"
    ><span role="presentation">&lt; </span> Back</a>

    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="false"
    />
  </div>
</template>

<script>
export default {
  name: 'EnterPassword',
  props: {
    'user': {
      type: Object,
      default () {
        return {
          username: '',
          welcomeMessage: 'Welcome!',
          authenticated: false
        }
      }
    }
  },
  data () {
    return {
      isLoading: false,
      passwordInput: ''
    }
  },
  methods: {
    signIn () {

    },
    goBack () {
      this.$store.commit('accounts/UPDATE_SIGNINSTATE', 0)
    },
    async resetPassword () {
      this.isLoading = true
      /** Get user ID from store. */
      let username = this.user.username
      /** If there's no user ID stored, redirect to the sign-in page. */
      if (!username) {
        await this.$store.commit('accounts/UPDATE_SIGNINSTATE', 0)
        return
      }
      try {
        /** Request password reset via API. Await result. */
        let { data } = await this.$axios.post('/api/accounts/recovery/begin', { username })
        /** Set local variable emailAddress equal to the result from the API call. */
        let { emailAddress } = data
        console.log(`The request worked and the email address is ${emailAddress}`)
        await this.$store.commit('accounts/UPDATE_USER', { emailAddress })
        this.$router.push('/accounts/recovery/begin')
      } catch (e) {
        /** If the request failed, show an error page. */
        return { success: false }
      }
    }
  }
}
</script>
