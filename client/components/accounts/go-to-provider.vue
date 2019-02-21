<template>
  <div id="enter-password">
    <h1>Welcome, {{ user.name.first }}!</h1>
    <p>
      To continue, sign in with your {{user.auth.provider}} account.
    </p>
      <div class="row">
        <div class="col-5 d-flex">
        </div>
        <div class="col-7">
          <a class="btn btn-primary btn-block" :href="'/api/accounts/'+user.auth.provider+'/start'">
            Continue to {{user.auth.provider}}
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
