<template>
  <div id="enter-password">
    <h1>{{ user.welcomeMessage }}</h1>
    <p>
      Please enter your password.
    </p>
    <form @submit.prevent="signIn">
      <div class="form-group mb-3">
        <label
          for="password"
          class="sr-only"
        >Password</label>
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required=""
          autofocus=""
        >
      </div>
      <div class="row">
        <div class="col-8 d-flex">
          <nuxt-link
            to="/accounts/recovery/begin"
            class="small"
            title="Reset my password"
          >
            Forgot your password?
          </nuxt-link>
        </div>
        <div class="col-4">
          <button class="btn btn-primary btn-block">
            Sign In
          </button>
        </div>
      </div>
    </form>
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
    name: 'EnterPassword',
    props: {
      'user': {
        type: Object,
        default () {
          return {
            username: null,
            welcomeMessage: 'Welcome!',
            authenticated: false
          }
        }
      }
    },
    methods: {
      signIn() {

      },
      goBack() {
        this.$store.commit('accounts/UPDATE_SIGNINSTATE', 0)
      }
    }
  }
</script>
