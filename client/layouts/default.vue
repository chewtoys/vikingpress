<template>
  <div id="vv">
    <nav
      class="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <nuxt-link
          class="navbar-item"
          to="/"
        >
          The Viking Voice
        </nuxt-link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style>
  html,
  body,
  #__nuxt,
  #__layout,
  #vv {
    height: 100%;
    width: 100%;
  }

  .vv-logo {
    height: 40px;
    width: initial;
    display: block;
  }

  .vv-accounts {
    display: flex;
    align-items: center;
  }

  .vv-accounts>div {
    display: block;
    margin: auto;
    max-width: 350px;
    max-height: 350px;
    padding: 40px 20px;
  }

  .has-bottom-margin-1 {
    margin-bottom: 1rem;
  }

  .title {
    font-family: "Merriweather", Georgia, serif;
  }
</style>
