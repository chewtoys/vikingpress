<template>
  <b-field
    :label="label"
    :type="error.exists === true ? 'is-danger' : null"
    :message="error.message"
  >
    <slot />
  </b-field>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    label: {
      type: String,
      default: ''
    },
    error: {
      type: Object,
      default () {
        return {
          exists: false,
          message: null
        }
      }
    }
  }
}
</script>
