<template>
  <main>
    <header class="mb-3">
      <span class="text-muted">Error {{ statusCode }}</span>
      <h1 v-if="statusCode === 404">
        Sorry, we couldn't find the page you requested.
      </h1>
      <h1 v-else>
        {{ message }}
      </h1>
    </header>
    <div>
      <a href="https://nsmsvikingvoice.org">Back to home page</a>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'accounts',
  name: 'NuxtError',
  head () {
    return {
      title: `Error ${this.statusCode} | The Viking Voice`
    }
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message
    }
  }
}
</script>

<style>
</style>
