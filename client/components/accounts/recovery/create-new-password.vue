<template>
  <div>
      <header class="mb-3">
          <span class="text-muted">Account recovery</span>
        <h1>Create a new password</h1>
      </header>
    <form @submit.prevent="resetPassword">
      <div class="form-group mb-3">
        <label
          for="password"
          class="sr-only"
        >Password</label>
        <input
          v-model="newPassword"
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
        </div>
        <div class="col-4">
          <button class="btn btn-primary btn-block">
            Reset Password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'EnterPassword',
    props: {
      'requestId': {
        type: String,
        default () {
          return ''
        }
      }
    },
    data() {
      return {
        newPassword: ''
      }
    },
    methods: {
      async resetPassword() {
        /** Send the new password to the server. */
        await this.$axios.post('/api/accounts/recovery/reset', { password: this.newPassword, requestId: this.requestId })
        /** When that works out splendidly, let the user know. */
        this.$emit('success', true)
      }
    }
  }
</script>
