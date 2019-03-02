<template>
  <main>
    <div class="vv-accounts" v-if="emailAddress">
      <header>
        <h1 class="title has-bottom-margin-1">Please check your email.</h1>
      </header>
      <p>
        We sent a message to <span style="font-weight:600;">{{ emailAddress }}</span>. To reset your password, follow the link in the message.
      </p>
    </div>
    <div class="vv-accounts box" v-else>
      <header>
        <h1 class="title has-bottom-margin-1">We're sorry.</h1>
      </header>
      <p>
        Because of a server error, we couldn't recover your account. Please contact us for more help.
      </p>
    </div>
  </main>
</template>

<script>
  export default {
    layout: 'default',
    head() {
      return {
        title: `Account Recovery | The Viking Voice`
      }
    },
    async asyncData({ app, redirect, store }) {
      /** Get user ID from store. */
      let { emailAddress } = store.state.accounts.user
      /** If there's no user ID stored, redirect to the sign-in page. */
      if (!emailAddress) {
        return redirect('/accounts/sign-in')
      }
      else {
        return { emailAddress }
      }
    }
  }
</script>

<style>
</style>
