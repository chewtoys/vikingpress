<template>
  <div class="box vv-accounts">
    <h1 class="title">{{ user.welcomeMessage }}</h1>
    <p class="subtitle">
      To continue, sign in with your {{user.authProvider}} account.
    </p>
          <a class="button is-info" :href="'/api/accounts/'+user.authProvider+'/start'">
            Continue to {{user.authProvider}}
          </a>
    <hr role="presentation">
    <a
      href="#"
      title="Go back"
      @click="goBack"
    ><span role="presentation">&lt; </span> Back</a>
  </div>
</template>

<script>
  export default {
    name: 'goToProvider',
    props: {
      'user': {
        type: Object,
        default () {
          return {
            username: null,
            welcomeMessage: 'Welcome!',
            authProvider: null,
            authenticated: false
          }
        }
      }
    },
    methods: {
      goBack() {
        this.$store.commit('accounts/UPDATE_SIGNINSTATE', 0)
      }
    }
  }
</script>
