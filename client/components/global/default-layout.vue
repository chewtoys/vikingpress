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
    <slot />
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

  @media only screen and (max-width: 559px) {
    .vv-accounts {
      display: block;
    }

    .vv-accounts>div {
      display: block;
      margin: auto;
      max-width: 100%;
      padding: 20px;
    }
  }

  @media only screen and (min-width: 560px) {
    .vv-accounts {
      display: flex;
      align-items: center;
    }

    .vv-accounts>div {
      display: block;
      margin: auto;
      max-width: 600px;
      max-height: 400px;
      padding: 40px 20px;
    }

    hr {
      max-width: 300px;
      margin: 24px auto;
    }

    .vv-auth-input {
      max-width: 300px;
      margin: auto;
    }
  }

  .has-bottom-margin-1 {
    margin-bottom: 1rem;
  }

  .title {
    font-family: "Merriweather", Georgia, serif;
  }
</style>
