<template>
  <main class="vv-accounts">
    <alreadySignedIn
      v-if="signInState===2"
      :user="user"
    />
    <enterPassword
      v-else-if="signInState===1"
      :user="user"
    />
    <goToProvider
      v-else-if="signInState===3"
      :user="user"
    />
    <signIn v-else />
  </main>
</template>

<script>
  import alreadySignedIn from '~/components/accounts/already-signed-in.vue'
  import enterPassword from '~/components/accounts/enter-password.vue'
  import goToProvider from '~/components/accounts/go-to-provider.vue'
  import signIn from '~/components/accounts/sign-in.vue'

  export default {
    layout: 'default',
    head() {
      return {
        title: `Sign In | The Viking Voice`
      }
    },
    components: {
      alreadySignedIn,
      enterPassword,
      goToProvider,
      signIn
    },
    computed: {
      user() {
        return this.$store.state.accounts.user
      },
      signInState() {
        return this.$store.state.accounts.signInState
      }
    },
    fetch({ store }) {
      store.dispatch('accounts/GET_SIGNIN_STATE')
      store.dispatch('accounts/FETCH_USER')
    }
  }
</script>

<style>
</style>
