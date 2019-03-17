<template>
  <default-layout>
    <main class="vv-accounts">
      <Nuxt />
      <b-loading
        :is-full-page="true"
        :active.sync="isLoading"
        :can-cancel="false"
      />
    </main>
  </default-layout>
</template>

<script>
import defaultLayout from '~/components/global/default-layout.vue'
export default {
  components: {
    defaultLayout
  },
  computed: {
    isLoading () {
      return this.$store.state.loading
    }
  },
  fetch ({ store }) {
    store.dispatch('IS_LOADING')
  }
}
</script>
