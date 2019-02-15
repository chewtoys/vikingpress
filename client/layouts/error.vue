<template>
    <main>
        <header class="mb-3">
            <span class="text-muted">Error {{statusCode}}</span>
            <h1 v-if="statusCode === 404">Sorry, we couldn't find the page you requested.</h1>
            <h1 v-else>{{message}}</h1>
        </header>
        <div>
          <a href="https://nsmsvikingvoice.org">Back to home page</a>
        </div>
    </main>
</template>

<script>
export default {
        layout: 'vv-auth',
  name: 'NuxtError',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: `Error ${this.statusCode}`
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message || `<%= messages.client_error %>`
    }
  }
  
}
</script>

<style>
</style>