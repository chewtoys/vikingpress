<template>
  <main>
    <div v-if="success">
      <header class="mb-3">
        <h1>Please check your email.</h1>
      </header>
      <p>
        We sent a message to <span style="font-weight:600;">{{ emailAddress }}</span>. To reset your password, follow the link in the message.
      </p>
    </div>
    <div v-else>
      <header class="mb-3">
        <h1>We're sorry.</h1>
      </header>
      <p>
        Because of a server error, we couldn't recover your account. Please contact us for more help.
      </p>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'accounts',
  head () {
    return {
      title: `Account Recovery | The Viking Voice`
    }
  },
  async asyncData ({ app, redirect, store }) {
    /** Get user ID from store. */
    let userId = store.state.accounts.user.id
    /** If there's no user ID stored, redirect to the sign-in page. */
    if (!userId) {
      return redirect('/accounts/sign-in')
    }
    try {
      /** Request password reset via API. Await result. */
      let { data } = await app.$axios.post('/api/accounts/reset-password', { userId })
      /** Set local variable emailAddress equal to the result from the API call. */
      return data
    } catch (e) {
      /** If the request failed, show an error page. */
      return { success: false }
    }
  }
}
</script>

<style>
</style>
