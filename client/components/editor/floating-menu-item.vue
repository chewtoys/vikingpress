<template>
  <b-tooltip
    position="is-right"
    type="is-light"
    :label="name"
  >
    <button
      :aria-label="name"
      class="button floating-menu-item is-white"
      @click="handleTrigger()"
    >
      <i
        :class="`fas fa-${icon}`"
        role="presentation"
      />
    </button>
  </b-tooltip>
</template>
<script>
export default {
  name: 'FloatingMenuItem',
  props: {
    name: { type: String, default: 'Unnamed' },
    onClick: {
      type: Function,
      default: () => {
        console.warn(`No click handler for provided for floating menu item ${this.name}`)
      }
    },
    icon: { type: String, default: 'question' },
    passToMethod: {
      type: Object,
      default () {
        return null
      }
    }
  },
  methods: {
    handleTrigger () {
      if (this.passToMethod) {
        this.onClick(this.passToMethod)
      } else {
        this.onClick()
      }
    }
  }
}
</script>

<style>
    .floating-menu-item {
        box-sizing: border-box;
        height: 45px;
        width: 45px;
    }
</style>
