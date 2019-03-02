<template>
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
    data() {
      return {
        usernameInput: ''
      }
    }
  }
</script>
