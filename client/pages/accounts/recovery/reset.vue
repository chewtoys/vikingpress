<template>
  <main>
    <div v-if="state === 'SUCCESS'">
      <header class="mb-3">
        <span class="text-muted">Account recovery</span>
        <h1>Your password has been reset.</h1>
      </header>
      <p>You can now sign in with your new password.</p>
      <div class="row">
        <div class="col-8 d-flex" />
        <div class="col-4">
          <nuxt-link
            to="/accounts/sign-in"
            class="btn btn-primary btn-block"
          >
            Sign In
          </nuxt-link>
        </div>
      </div>
    </div>
    <createNewPassword
      v-else-if="state === 'RESET_PW'"
      :request-id="requestId"
      @success="handleSuccess"
    />
  </main>
</template>

<script>
import createNewPassword from '~/components/accounts/recovery/create-new-password'
export default {
  layout: 'accounts',
  components: {
    createNewPassword
  },
  head () {
    return {
      title: `Account Recovery | The Viking Voice`
    }
  },
  async asyncData ({ app, redirect, query, req }) {
    /** Get request ID from the URL query. */
    let requestId = req.query.request || query.request
    /** If there's no request ID, redirect to the sign-in page. */
    if (!requestId) {
      console.log('NO REQUEST ID')
      return redirect('/accounts/sign-in')
    }

    /** Check that the request is valid. */
    let response = await app.$axios.post('/api/accounts/recovery/find', { requestId: requestId })
    let { user, valid } = response.data
    if (!valid) {
      console.log('INVALID REQUEST')
      /** Redirect away if the request is invalid. */
      return redirect('/accounts/sign-in')
    } else {
      /** If the request is valid, allow the user to create a new password. */
      return { state: 'RESET_PW', requestId, user }
    }
  },
  methods: {
    handleSuccess () {
      this.state = 'SUCCESS'
    }
  }
}
</script>

<style>
</style>
