<template lang="pug">
  .notes(:class="{ isReady }")
    .preloader(v-if="!isReady")
    .notes__head(ref="header" :class="{ isSidebarOpen: getSidebarStatus }")
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

    .container
      transition-group.notes__container(
        mode="out-in"
        name="notes"
        tag="div"
        v-if="notes"
      )
        .notes__item(
          v-for="(note, index) in notesFiltered"
          :key="note.id"
          ref="gridItems"
        )
          app-note-one.js-item-wrapper(
            ref="AppNoteOne"
            :note-index="index"
            :note="note"
            @add-row="addRow"
            @add-title="addTitle"
            @input-text="inputText"
            @remove-row="removeRow"
            @remove-note="removeNote"
            @set-background-note="setBackgroundNote"
            @toggle-check-row="toggleCheckRow"
          )
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
