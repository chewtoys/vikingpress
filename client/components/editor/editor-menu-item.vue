<template>
  <b-tooltip
    position="is-bottom"
    type="is-dark"
    :label="`${name}${activeClass ? ' (Active)' : ''}`"
  >
    <button
      :aria-label="name"
      :class="`button card-footer-item ${activeClass ? 'is-active' : ''}`"
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
  name: 'EditorMenuItem',
  props: {
    name: { type: String, default: 'Unnamed' },
    onClick: {
      type: Function,
      default: () => {
        console.warn(`No click handler for provided for editor menu item ${this.name}`)
      }
    },
    icon: { type: String, default: 'question' },
    activeClass: {
      type: Boolean,
      default: false
    },
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
