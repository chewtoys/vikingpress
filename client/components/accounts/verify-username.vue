<template>
  <form @submit.prevent="onSubmit(usernameInput)">
    <div class="form-group mb-3">
      <label
        for="username"
        class="sr-only"
      >Username or email address</label>
      <input
        id="username"
        v-model.trim="usernameInput"
        type="text"
        class="form-control"
        placeholder="Username or email address"
        required=""
        autofocus=""
      >
    </div>
    <div class="row">
      <div class="col-8 d-flex" />
      <div class="col-4">
        <button class="btn btn-primary btn-block">
          Next
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'VerifyUsername',
  props: {
    'onSubmit': {
      type: Function,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      usernameInput: ''
    }
  }
}
</script>
