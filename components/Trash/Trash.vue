<template lang="pug">
  .notes(:class="{ isReady }")
    .preloader(v-if="!isReady")
    .notes__head
      .title Trash
      .notes__head-actions
        transition-group.notes__head-info(
          mode="out-in"
          name="fade"
          tag="div"
          v-if="isShowInfo"
        )
          div(:key="1" v-if="isSaving")
            span Saving...
            .preloader
          div(:key="2" v-else)
            span Changes saved

    transition-group.notes__container(
      mode="out-in"
      name="notes"
      tag="div"
      v-if="notes.length"
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
          @remove-note="removeNoteAlways"
          @set-background-note="setBackgroundNote"
          @toggle-check-row="toggleCheckRow"
        )
    .title(v-else) Корзина пуста
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
      return this.notes.filter(item => item.trash)
    }
  }
}
</script>

<style lang="scss">
@import '../Notes/Notes.scss';
</style>
