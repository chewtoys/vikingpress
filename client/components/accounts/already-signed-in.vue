<template>
  <div class="">
    <header class="mb-3">
      <h1 class="title">
        You're already signed in.
      </h1>
      <!-- Add user information here. -->
      <button
        class="button is-secondary"
        @click="signOut"
      >
        Sign Out
      </button>
    </header>
  </div>
</template>

<script>
export default {
  name: 'AlreadySignedIn',
  props: {
    'user': {
      type: Object,
      default () {
        return {
          username: null,
          firstName: null,
          authenticated: true
        }
      }
    }
  },
  methods: {
    signOut () {
      this.$store.commit('accounts/UPDATE_USER', 'SIGN_OUT')
      this.$store.commit('accounts/UPDATE_SIGNINSTATE', 0)
    }
  }
}
</script>
