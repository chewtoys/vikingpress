<template>
  <div id="vv-signin">
    <div id="vv-signin-wrapper">
      <nuxt-link to="/">
        <img
          src="~/assets/vv-logo.png"
          alt="The Viking Voice"
          class="mb-4"
        >
      </nuxt-link>
      <transition>
        <Nuxt />
      </transition>
    </div>
  </div>
</template>

<script>
    export default {}
</script>

<style>
    #vv-signin {
        background-color: #fff;
        margin: auto;
        padding: 30px;
    }

    @media only screen and (min-width: 441px) {

        html,
        body,
        #__nuxt,
        #__layout {
            background-color: #f5f4f4;
            height: 100%;
            width: 100%;
            color: #191716 !important;
        }

        #__nuxt,
        #__layout {
            display: flex;
            align-items: center;
        }

        #vv-signin {
            border: 1px solid #e0e2db;
            padding: 40px;
        }

        #vv-signin-wrapper {
            width: 350px;
            display: block;
        }
    }

    h1 {
        font-weight: 600;
        font-size: 24px;
    }

    img {
        height: 40px;
        display: block;
    }

    .btn,
    input {
        border-radius: 0 !important;
    }

    input {
        border: 1px solid #e0e2db !important;
    }

    input:invalid {
        box-shadow: none;
    }

    .btn:focus,
    input:focus,
    a:focus {
        box-shadow: 0 0 0 .2rem rgba(25, 187, 187, .25) !important;
    }

    a {
        color: #138e8e;
    }

    a:hover {
        color: #0d6161;
        text-decoration: underline;
    }

    a:focus {
        background-color: rgba(25, 187, 187, .25);
        outline: none;
    }

    .btn-primary {
        background-color: #138e8e;
        border: none !important;
    }

    .btn-primary:hover,
    .btn-primary:active {
        background-color: #0d6161 !important;
    }

    .btn-primary:active {
        border-bottom: none !important;
    }

    a:first-of-type:focus {
        box-shadow: none !important;
    }

    a:first-of-type:focus>img {
        box-shadow: 0 0 0 .2rem rgba(25, 187, 187, .25) !important;
    }
</style>
