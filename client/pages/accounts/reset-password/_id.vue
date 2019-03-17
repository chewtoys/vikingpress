<template>
  <div>
    <div v-if="state==='RESET_PW'">
      <header>
        <span class="is-size-5 has-text-grey">Account recovery</span>
        <h1 class="title has-bottom-margin-1">
          Create a new password
        </h1>
      </header>
      <form @submit.prevent="resetPassword(newPassword)">
        <form-field
          label="New Password"
          :error="error"
        >
          <b-input
            v-model="newPassword"
            class="vv-auth-input"
          />
        </form-field>
        <button class="button is-info">
          Reset Password
        </button>
      </form>
    </div>
    <div v-else>
      <header>
        <h1 class="title has-bottom-margin-1">
          Your password has been updated.
        </h1>
      </header>
      <p>You can now sign in with your new password.</p>
      <hr role="presentation">
      <nuxt-link
        to="/accounts/sign-in"
        class="button is-info"
      >
        Sign In
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import formField from '~/components/global/form-field.vue'
export default {
  layout: 'accounts',
  components: {
    formField
  },
  data () {
    return {
      newPassword: '',
      error: {
        exists: false,
        message: null
      },
      state: 'RESET_PW'
    }
  },
  async asyncData ({ app, params, req, redirect }) {
    /** Get request ID from the URL query. */
    let requestId = params.id
    /** If there's no request ID, redirect to the sign-in page. */
    if (!requestId) {
      console.log('NO REQUEST ID')
      return redirect('/accounts/sign-in')
    }

    /** Check that the request is valid. */
    let response = await app.$axios.$get(`/api/accounts/reset-password/${requestId}`)
    if (response.status === 'success') {
      return { requestId, user: response.data }
    } else {
      console.log('INVALID REQUEST')
      /** Redirect away if the request is invalid. */
      return redirect('/accounts/sign-in')
    }
  },
  methods: {
    async resetPassword (newPassword) {
      if (!newPassword) {
        this.error = {
          exists: true,
          message: 'Enter a new password.'
        }
      }
      this.$store.commit('START_LOADING')
      /** Send the new password to the server. */
      let response = await this.$axios.$post(`/api/accounts/reset-password/${this.requestId}`, { password: newPassword })
      this.$store.commit('STOP_LOADING')

      /** When that works out splendidly, let the user know. */
      if (response.status === 'success') {
        this.state = 'SUCCESS'
      } else {
        this.error = {
          exists: true,
          message: response.message
        }
      }
    }
  }
}
</script>
