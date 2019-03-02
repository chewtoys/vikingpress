<template>
  <div>
    <header>
      <span class="is-size-5 has-text-grey">Account recovery</span>
      <h1 class="title has-bottom-margin-1">
        Create a new password
      </h1>
    </header>
    <form @submit.prevent="resetPassword">
      <b-field label="New Password">
        <b-input v-model="newPassword" />
      </b-field>
      <button class="button is-info">
        Reset Password
      </button>
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
  data () {
    return {
      newPassword: ''
    }
  },
  methods: {
    async resetPassword () {
      /** Send the new password to the server. */
      await this.$axios.post('/api/accounts/recovery/reset', { password: this.newPassword, requestId: this.requestId })
      /** When that works out splendidly, let the user know. */
      this.$emit('success', true)
    }
  }
}
</script>
