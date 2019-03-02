<template>
  <main class="vv-accounts">
    <div>
      <header>
        <h1
          v-if="statusCode === 404"
          class="title has-bottom-margin-1"
        >
          Sorry, we couldn't find the page you requested.
        </h1>
        <h1
          v-else
          class="title has-bottom-margin-1"
        >
          {{ message }}
        </h1>
      </header>
      <nuxt-link to="/">
        Back to home page
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'default',
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
  main {
    align-items: center;
    height: calc(100% - 56px);
    display: flex;
    padding: 15px;
  }

  main>div {
    width: 100%;
    display: block;
    text-align: center;
  }

  #vv-error-code {
    color: #6c757d;
    text-transform: uppercase;
    font-weight: 600;
    font-size: .9rem;
  }

  h1 {
    margin-top: .5rem;
  }
</style>
