<template>
  <article class="container">
    <header>
      <span
        v-if="principalCategory"
        class="is-size-5 has-text-grey"
      >{{ principalCategory }}</span>
      <h1 class="title">
        {{ title }}
      </h1>
      <p>
        <span class="is-sr-only">By </span><a href="#" rel="author">{{authors}}</a><span class="is-sr-only">.</span>
        <span role="presentation">-</span>
        <span class="is-sr-only">Published on</span><time :datetime="date.unformatted">{{ date.formatted }}</time><span class="is-sr-only">.</span>
      </p>
    </header>
    <hr role="presentation">
    <div
      class="vv-article-body content"
      v-html="body"
    />
  </article>
</template>

<script>
  export default {
    head() {
      return {
        title: `${this.title} | The Viking Voice`
      }
    },
    async asyncData({ app, params, error }) {
      try {
        /** Get user ID from store. */
        let { year, month, day, slug } = params
        if (!year || !month || !day || !slug) {
          return error({ statusCode: 404 })
        }
        /** Request password reset via API. Await result. */
        let { data } = await app.$axios.get('/api/posts/', { params: { year, month, day, slug } })

        if (!data) {
          return error({ statusCode: 404 })
        }

        /** Set local variable emailAddress equal to the result from the API call. */
        return data
      }
      catch (e) {
        /** If the request failed, show an error page. */
        return error({ statusCode: 404 })
      }
    }
  }
</script>

<style>
  article {
    max-width: 700px;
    padding: 20px;
  }

  .content>*>img {
    width: 100%;
  }

  .has-authors {
    display: inline-block;
    font-style: normal;
  }
</style>
