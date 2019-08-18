<template lang="pug">
  .note(:class="[{ isFocused: isFocused }, note.background]")

    .note__title-wrapper
      h5.note__title(
        contenteditable="true"
        data-placeholder="Добавить заголовок"
        ref="title"
        v-show="needTitle"
        v-text="note.title"
        @focus="isFocused = true"
        @blur="inputText('title', $event); isFocused = false;"
        @keydown.enter.prevent="enterClick($event)"
      )
      button.note__row-remove(@click="removeRow('title')")
        icon-close

    .note__content
      .note__content-inner
        .note__content-wrapper
          .note__row(
            v-for="(row, index) in note.rows"
            :key="row.id"
            :class="{ isChecked: row.checked }"
          )
            button.note__row-label(@click="toggleCheckRow(index)")
              icon-check
            .note__row-text(
              ref="rows"
              contenteditable="true"
              @focus="isFocused = true"
              @blur=" inputText(index, $event); isFocused = false; "
              @keydown.enter.exact.prevent="enterClick($event, index)"
              v-text="row.text"
            )
            button.note__row-remove(@click="removeRow(index)")
              icon-close
      .note__row.note__row--add(@click="addRow")
        button.note__row-label
          icon-plus
        .note__row-text New item

    .note__remove(@click="removeNote")
      icon-close

    .note__actions
      button.note__title-button(
        title="Добавить заголовок"
        :class="{ isHidden: needTitle }"
        @click="addTitle"
      )
        icon-plus
      .note__backgrounds-wrapper
        .note__backgrounds-list.isOpen
          button.note__background(
            title="Сделать фоновым цветом"
            v-for="background in backgrounds"
            :key="background"
            :class="background"
            @click="setBackgroundNote(background)"
          )
</template>

<script>
import iconCheck from '~/assets/svg/check.svg'
import iconClose from '~/assets/svg/close.svg'
import iconPlus from '~/assets/svg/plus.svg'
import iconMenu from '~/assets/svg/menu.svg'

export default {
  name: 'NoteOne',
  components: {
    iconCheck,
    iconClose,
    iconPlus,
    iconMenu
  },
  props: {
    note: {
      type: Object,
      required: true
    },
    noteIndex: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isFocused: false,
      isHovered: false,
      isBackgroundsOpen: false,
      backgrounds: ['', 'isCyan', 'isYellow', 'isGreen', 'isPink']
    }
  },
  computed: {
    needTitle () {
      return this.note.title !== false
    }
  },
  methods: {
    inputText (rowIndex, $event) {
      this.$emit('input-text', [
        this.noteIndex,
        rowIndex,
        $event.currentTarget.textContent
      ])
    },

    toggleCheckRow (rowIndex) {
      this.$emit('toggle-check-row', [rowIndex, this.noteIndex])
    },

    setCursorToEnd (el) {
      if (!el.textContent.length) {
        return
      }

      const range = document.createRange()
      const sel = window.getSelection()
      range.setStart(el.childNodes[0], el.textContent.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    },

    enterClick (e, index) {
      if (e.target === this.$refs.title) {
        this.$refs.rows[0].focus()
        this.setCursorToEnd(this.$refs.rows[0])
        return
      }

      if (index < this.$refs.rows.length - 1) {
        this.$refs.rows[index + 1].focus()
        this.setCursorToEnd(this.$refs.rows[index + 1])
        return
      }

      if (index === this.$refs.rows.length - 1) {
        this.addRow()
      }
    },

    addTitle () {
      this.$emit('add-title')
    },

    addRow () {
      this.$emit('add-row')
    },

    setFocusToRow (data) {
      if (data === 'title') {
        this.$refs.title.focus()
        return
      }
      this.$refs.rows[data - 1].focus()
    },

    removeRow (rowIndex) {
      this.$emit('remove-row', [rowIndex, this.noteIndex])
    },

    removeNote () {
      this.$emit('remove-note')
    },

    setBackgroundNote (background) {
      this.$emit('set-background-note', [this.noteIndex, background])
    }
  }
}
</script>

<style lang="scss">
@import './NoteOne.scss';
</style>
