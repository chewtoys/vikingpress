<template>
  <div id="enter-password">
    <h1>Welcome, {{ user.firstName }}!</h1>
    <p>
      To continue, sign in with your {{user.authProvider}} account.
    </p>
      <div class="row">
        <div class="col-5 d-flex">
        </div>
        <div class="col-7">
          <a class="btn btn-primary btn-block" :href="'/api/accounts/'+user.authProvider+'/start'">
            Continue to {{user.authProvider}}
          </a>
        </div>
      </div>
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
            name: {
              first: null
            },
            auth: {
              provider: null
            },
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
