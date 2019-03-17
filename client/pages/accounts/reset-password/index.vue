<template>
  <div>
    <header>
      <h1 class="title has-bottom-margin-1">
        Please check your email.
      </h1>
    </header>
    <p>
      We sent a message to <span style="font-weight:600;">{{ emailAddress || 'you' }}</span>. To reset your password, follow the link in the message.
    </p>
  </div>
</template>

<script>
export default {
  layout: 'accounts',
  async asyncData ({ app, redirect, store, error }) {
    store.commit('START_LOADING')
    await store.dispatch('FETCH_USER')
    let { username } = store.state.user
    if (!username) {
      return redirect('/accounts/sign-in')
    }
    let response = await app.$axios.$post('/api/accounts/reset-password', { username })
    if (response.status === 'success') {
      store.commit('STOP_LOADING')
      return { emailAddress: response.data.emailAddress }
    } else {
      store.commit('STOP_LOADING')
      error({ message: response.message })
    }
  }
}
</script>
