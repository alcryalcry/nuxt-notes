<template lang="pug">
  .notes(:class="{ isReady }")
    .preloader(v-if="!isReady")
    .notes__head
      .title Notes
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
        button.notes__add(@click="addNote")
          .notes__add-icon
            icon-plus
          | New note

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
          @remove-note="removeNoteToTrash"
          @set-background-note="setBackgroundNote"
          @toggle-check-row="toggleCheckRow"
        )
          //- @remove-note="removeNoteAlways(index)"
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
  computed: {
    notesFiltered () {
      return this.notes.filter(item => !item.trash)
    }
  }
}
</script>

<style lang="scss">
@import './Notes.scss';
</style>
