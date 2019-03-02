<template>
  <main>
    <div>
    <h1 class="title">This website is under construction.</h1>
    <p class="subtitle">Honestly, how did you even find it? I'm kind of impressed.</p>
    <p>Well, now that you're here, <a href="https://nsmsvikingvoice.org">click here to go to The Viking Voice</a>.</p>
    </div>
  </main>
</template>

<script>
  export default {
    layout: 'main',
    head() {
      return {
        title: `Home | The Viking Voice`
      }
    }
  }
</script>

<style>
  main {
    align-items: center;
    height: 100%;
    display: flex;
    padding: 15px;
  }

  main>div {
    width: 100%;
    display: block;
    text-align: center;
  }
</style>
