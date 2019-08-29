<template lang="pug">
  .notes(:class="{ isReady }")
    .preloader(v-if="!isReady")
    .notes__head(ref="header" :class="{ isSidebarOpen: GET_SIDEBAR_STATUS }")
      .container
        .title {{ title }}
        .notes__head-actions
          transition-group.notes__head-info(
            mode="out-in"
            tag="div"
            v-if="isShowInfo"
          )
            div(:key="1" v-if="isSaving")
              span Saving...
              .preloader
            div(:key="2" v-else)
              span Changes saved
          button.notes__add(@click="addNote" v-if="!isTrash")
            .notes__add-icon
              icon-plus
            | New note
          button.notes__add(@click="clearTrash" v-if="isTrash && notesFiltered.length")
            .notes__add-icon.isTrash
              icon-plus
            | Clear trash

    .container
      transition-group(
        tag="div"
        name="fade"
        mode="out-in"
      )
        transition-group.notes__container(
          tag="div"
          name="notes"
          mode="out-in"
          key="1"
          v-if="notesFiltered.length"
        )
          .notes__item(
            ref="gridItems"
            v-for="(note, index) in notesFiltered"
            :key="note.id"
          )
            app-note-one.js-item-wrapper(
              ref="AppNoteOne"
              :note-index="index"
              :note="note"
              :is-trash="isTrash"
              @add-row="addRow"
              @add-title="addTitle"
              @input-text="inputText"
              @remove-row="removeRow"
              @remove-note="removeNote"
              @set-background-note="setBackgroundNote"
              @toggle-check-row="toggleCheckRow"
            )
        .empty-text(
          key="2"
          v-if="isReady && !notesFiltered.length"
        )
          p(v-for="text in emptyText") {{ text }}
</template>

<script>
import AppNoteOne from '~/components/NoteOne/NoteOne.vue'
import iconPlus from '~/assets/svg/plus.svg'
import notesActions from '~/plugins/notesActions'

export default {
  name: 'Notes',
  components: {
    AppNoteOne,
    iconPlus
  },
  mixins: [notesActions],
  props: {
    isTrash: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'TODO Notes'
    }
  },
  computed: {
    emptyText () {
      if (this.isTrash) {
        return [
          "There's nothing here!"
        ]
      }
      return [
        "Add a note using the 'New note' button.",
        'Notes are stored in local storage only in this browser.'
      ]
    },
    notesFiltered () {
      if (this.isTrash) {
        return this.notes.filter(item => item.trash)
      }
      return this.notes.filter(item => !item.trash)
    }
  }
}
</script>

<style lang="scss">
@import './Notes.scss';
</style>
