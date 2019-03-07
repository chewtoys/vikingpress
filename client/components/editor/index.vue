<template>
  <div class="container card">
    <no-ssr>
      <editor-menu-bar :editor="editor">
        <header
          slot-scope="{ commands, isActive, getMarkAttrs }"
          class="card-header is-fixed-top"
        >
          <editor-menu-item
            name="Bold"
            icon="bold"
            :active-class="isActive.bold()"
            :on-click="commands.bold"
          />
          <editor-menu-item
            name="Italic"
            icon="italic"
            :active-class="isActive.italic()"
            :on-click="commands.italic"
          />
          <editor-menu-item
            name="Underline"
            icon="underline"
            :active-class="isActive.underline()"
            :on-click="commands.underline"
          />
          <!-- Begin link modal -->
          <b-modal :active.sync="linkMenuIsActive">
            <div
              class="modal-card container"
              style="margin:auto;"
            >
              <form
                class="menububble__form"
                @submit.prevent="setLinkUrl(commands.link, linkUrl)"
              >
                <header class="modal-card-head">
                  <p class="modal-card-title">
                    Link
                  </p>

                  <button
                    type="button"
                    class="button"
                    style="margin-left:auto;"
                    @click="hideLinkMenu()"
                  >
                    Close
                  </button>
                </header>
                <section class="modal-card-body">
                  <b-field label="Link URL">
                    <b-input
                      ref="linkInput"
                      v-model="linkUrl"
                      placeholder="https://"
                      @keydown.esc="hideLinkMenu"
                    />
                  </b-field>
                </section>
                <footer class="modal-card-foot">
                  <button
                    type="button"
                    class="button"
                    style="margin-left:auto;"
                    @click="removeLink(commands.link)"
                  >
                    Remove Link
                  </button>
                  <button
                    type="submit"
                    class="button is-info"
                  >
                    Set Link
                  </button>
                </footer>
              </form>
            </div>
          </b-modal>
          <!-- End link modal -->
          <b-tooltip
            position="is-bottom"
            type="is-dark"
            label="Link"
          >
            <button
              aria-label="Link"
              class="button card-footer-item"
              :class="{ 'is-active': isActive.link() }"
              @click="showLinkMenu(getMarkAttrs('link'))"
            >
              <i
                class="fas fa-link"
                role="presentation"
              />
            </button>
          </b-tooltip>

          <editor-menu-item
            name="Subheading"
            icon="heading"
            :active-class="isActive.heading({ level: 2 })"
            :on-click="commands.heading"
            :pass-to-method="{level:2}"
          />
          <editor-menu-item
            name="Blockquote"
            icon="quote-right"
            :active-class="isActive.blockquote()"
            :on-click="commands.blockquote"
          />
          <editor-menu-item
            name="Numbered List"
            icon="list-ol"
            :active-class="isActive.ordered_list()"
            :on-click="commands.ordered_list"
          />
          <editor-menu-item
            name="Bulleted List"
            icon="list-ul"
            :active-class="isActive.bullet_list()"
            :on-click="commands.bullet_list"
          />
          <editor-menu-item
            name="Divider"
            icon="minus"
            :on-click="commands.horizontal_rule"
          />
          <editor-menu-item
            name="Undo"
            icon="undo"
            :on-click="commands.undo"
          />
          <editor-menu-item
            name="Redo"
            icon="redo"
            :on-click="commands.redo"
          />
        </header>
      </editor-menu-bar>
      <editor-floating-menu :editor="editor">
        <div
          slot-scope="{ commands, isActive, menu }"
          class="editor-floating-menu"
          :class="{ 'is-active': menu.isActive }"
          :style="`top: ${menu.top}px`"
        >
          <floating-menu-item
            name="Subheading"
            icon="heading"
            :on-click="commands.heading"
            :pass-to-method="{level:2}"
          />
          <floating-menu-item
            name="Blockquote"
            icon="quote-right"
            :on-click="commands.blockquote"
          />
          <floating-menu-item
            name="Bulleted List"
            icon="list-ul"
            :on-click="commands.bullet_list"
          />

          <floating-menu-item
            name="Numbered List"
            icon="list-ol"
            :on-click="commands.ordered_list"
          />

          <floating-menu-item
            name="Divider"
            icon="minus"
            :on-click="commands.horizontal_rule"
          />
        </div>
      </editor-floating-menu>
      <div class="card-content">
        <editor-content :editor="editor" />
      </div>
    </no-ssr>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar, EditorFloatingMenu } from 'tiptap'
import {
  Blockquote,
  HorizontalRule,
  Heading,
  OrderedList,
  BulletList,
  History,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Placeholder,
  Underline
}
  from 'tiptap-extensions'
import EditorMenuItem from './editor-menu-item.vue'
import FloatingMenuItem from './floating-menu-item.vue'
export default {
  name: 'VikingPressEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorFloatingMenu,
    EditorMenuItem,
    FloatingMenuItem
  },
  props: {
    'content': {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      editor: null,
      linkUrl: null,
      linkMenuIsActive: false
    }
  },
  mounted () {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new HorizontalRule(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Italic(),
        new Link(),
        new Placeholder({
          emptyClass: 'is-empty',
          emptyNodeText: 'Write or paste here...',
          showOnlyWhenEditable: true
        }),
        new Underline(),
        new History()
      ],
      editorProps: {
        attributes: {
          class: 'ProseMirror content'
        }
      },
      content: this.content,
      linkUrl: null,
      linkMenuIsActive: false
    })
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },
    removeLink (command) {
      this.setLinkUrl(command, '')
    },
    test () {
      console.log('test')
    }
  }
}
</script>

<style>
  .button.card-footer-item:focus {
    border-color: #dbdbdb;
  }

  .modal-close.is-large {
    display: none;
  }

  .card-header {
    justify-content: center;
  }

  .card-header.is-fixed-top {
    background-color: #ffffff;
    position: sticky;
    top: 0;
  }

  .button.card-footer-item {
    flex-basis: unset;
    flex-grow: unset;
    flex-shrink: unset;
    border-radius: 0;
    border-top: 0;
    border-bottom: 0;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
  }

  .button.card-footer-item:focus,
  .button.card-footer-item:hover,
  .button.card-footer-item:active {
    z-index: 500;
  }

  .button.card-footer-item:active,
  .button.card-footer-item.is-active {
    border-color: #dbdbdb !important;
    background-color: whitesmoke;
  }

  .editor-floating-menu {
    position: absolute;
    margin-top: -0.5rem;
    margin-left: 39px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
  }

  .editor-floating-menu.is-active {
    opacity: 1;
    visibility: visible;
  }
</style>
