<template>
  <div style="background-color:#e5e3e2;">
    <div
      class="container box"
      style="box-sizing:content-box; max-width:760px;"
    >
      <div class="columns">
        <div
          class="column"
          style="max-width:calc(100%-200px);"
        >
          <b-field label="Title">
            <b-input :value="title" />
          </b-field>
          <b-field label="Dek">
            <b-input
              type="textarea"
              rows="1"
              :value="dek"
            />
          </b-field>
          <b-field label="Byline">
            <b-input :value="authors" />
          </b-field>
          <b-field label="Collections">
            <b-input :value="collections" />
          </b-field>
        </div>
        <div class="column featured-image-column">
          <div style="display:block;">
            <label
              for="featured-image"
              style="font-weight:bold;"
            >Featured Image</label>
            <div
              class="is-featured-image"
              :style="'background-image: url('+featuredImage.path+');'"
            />
            <a
              href="#"
              role="button"
              class="help counter has-text-right has-text-weight-bold"
            ><b-icon
              pack="fas"
              icon="trash"
            />Remove</a>
          </div>
          <div
            class="field"
            style="display:block;"
          >
            <b-checkbox
              type="is-info"
              class="is-small"
            >
              Show on Home Page
            </b-checkbox>
          </div>
        </div>
      </div>
    </div><div
      class="container box"
      style="box-sizing:content-box; max-width:760px;"
    >
      <no-ssr>
        <editor-menu-bar :editor="editor">
          <div slot-scope="{ commands, isActive }">
            <button
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold"
            >
              Bold
            </button>
          </div>
        </editor-menu-bar>
        <editor-content :editor="editor" />
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History
}
  from 'tiptap-extensions'

export default {
  header () {
    return {
      title: 'Edit Post | The Viking Voice'
    }
  },
  /** All the TipTap editor stuff */
  components: {
    EditorContent,
    EditorMenuBar
  },
  data () {
    return {
      editor: null
    }
  },
  /** Fetch post data from server. */
  async asyncData ({ app, params, error }) {
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
    } catch (e) {
      /** If the request failed, show an error page. */
      return error({ statusCode: 404 })
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History()
      ],
      editorProps: {
        attributes: {
          class: 'ProseMirror content'
        }
      },
      content: this.body
    })
    console.log(this.editor.getJSON())
  },
  beforeDestroy () {
    this.editor.destroy()
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

  .ProseMirror {
    padding: 10px;
    border: 1px solid #e9e2db;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(25, 23, 22, 0.1);
  }

  .ProseMirror:hover {
    border-color: #b5afab;
  }

  .ProseMirror:focus {
    border-color: #138e8e;
    box-shadow: 0 0 0 0.125em rgba(19, 142, 142, 0.25);
  }
</style>
