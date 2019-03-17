<template>
  <div>
    <h1
      class="title"
      v-html="user.welcomeMessage"
    />
    <p class="subtitle">
      Please enter your password.
    </p>
    <form @submit.prevent="signIn(passwordInput)">
      <form-field
        label="Password"
        :error="error"
      >
        <b-input
          v-model="passwordInput"
          class="vv-auth-input"
        />
      </form-field>
      <div class="is-clearfix vv-auth-input">
        <a
          href="#"
          class="is-pulled-left is-small"
          title="Reset my password"
          @click="resetPassword"
        >
          Forgot your password?
        </a>
        <button class="button is-info is-pulled-right">
          Sign In
        </button>
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
import formField from '~/components/global/form-field.vue'
export default {
  layout: 'accounts',
  components: {
    formField
  },
  data () {
    return {
      passwordInput: '',
      error: {
        exists: false,
        message: null
      }
    }
  },
  // computed: {
  //     user() {
  //         let { user } = this.$store.state
  //         if (!user || !user.id) {
  //             this.$router.replace('/accounts/sign-in')
  //         }
  //         return this.$store.state.user
  //     }
  // },
  // fetch({ store }) {
  //     store.dispatch('FETCH_USER')
  // },
  async asyncData ({ store, redirect }) {
    await store.dispatch('FETCH_USER')
    let { user } = store.state
    if (!user || !user.id || !user.username) {
      return redirect('/accounts/sign-in')
    }
    return {
      user
    }
  },
  methods: {
    signIn (passwordInput) {
      if (!passwordInput) {
        return this.error = {
          exists: true,
          message: 'Enter your password.'
        }
      }
    },
    goBack () {
      this.$store.commit('UPDATE_USER', 'SIGN_OUT')
      this.$router.push('/accounts/sign-in')
    },
    resetPassword () {
      this.$store.commit('START_LOADING')
      this.$router.push('/accounts/reset-password')
    }
  }
}
</script>
