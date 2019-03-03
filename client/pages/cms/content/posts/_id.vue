<template>
  <div style="height: calc(100% - 52px); background-color:#e5e3e2;">
    <div class="container box" style="box-sizing:content-box; max-width:760px;">
      <div class="columns">
      <div class="column" style="max-width:calc(100%-200px);">
      <b-field label="Title">
        <b-input :value="title"></b-input>
      </b-field>
      <b-field label="Dek">
        <b-input type="textarea" rows="1" :value="dek"></b-input>
      </b-field>
      <b-field label="Byline">
        <b-input :value="authors"></b-input>
      </b-field>
      <b-field label="Collections">
        <b-input :value="collections"></b-input>
      </b-field>
      </div>
      <div class="column featured-image-column">
        <div style="display:block;">
        <label for="featured-image" style="font-weight:bold;">Featured Image</label>
        <div class="is-featured-image" :style="'background-image: url('+featuredImage.path+');'"></div>
        <a href="#" role="button" class="help counter has-text-right has-text-weight-bold"><b-icon
                pack="fas"
                icon="trash"
                />Remove</a></div>
                <div class="field" style="display:block;"><b-checkbox type="is-info" class="is-small">Show on Home Page</b-checkbox></div>
                
      </div>
    </div></div><div class="container box" style="box-sizing:content-box; max-width:760px;"><div
      class="vv-article-body content"
      v-html="body"
    /></div>
  </div>
</template>

<script>
  export default {
    header() {
      return {
        title: "Editing Post | The Viking Voice"
      }
    },
    async asyncData({ app, params, error }) {
      try {
        /** Get user ID from store. */
        let { id } = params
        if (!id) {
          return error({ statusCode: 404 })
        }
        /** Request password reset via API. Await result. */
        let { data } = await app.$axios.get('/api/posts/', { params: { id } })

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
  .is-featured-image {
    margin-top: 8px;
    background-color: black;
    height: 200px;
    width: 200px;
    border-radius: 4px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover
  }

  .featured-image-column {
    display: flex;
    max-width: 200px;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
  }
</style>
