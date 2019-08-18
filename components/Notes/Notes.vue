<template lang="pug">
  .notes(:class="{ isReady }")
    .preloader(v-if="!isReady")
    .notes__head
      .title Notes
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
        button.notes__add(@click="addNote")
          .notes__add-icon
            icon-plus
          | New note

    transition-group.row.gut.notes__container(
      mode="out-in"
      name="notes"
      tag="div"
      v-if="notes"
    )
      .col-3.col-t-6(
        v-for="(note, index) in notes"
        :key="note.id"
        v-show="!note.trash"
      )
        app-note-one(
          ref="AppNoteOne"
          :note-index="index"
          :note="note"
          @set-background-note="setBackgroundNote"
          @add-title="addTitle(index)"
          @add-row="addRow(index)"
          @remove-row="removeRow"
          @toggle-check-row="toggleCheckRow"
          @remove-note="removeNoteToTrash(index)"
          @input-text="inputText"
        )
          //- @remove-note="removeNoteAlways(index)"
</template>

<script>
import AppNoteOne from '~/components/NoteOne/NoteOne.vue';
import iconPlus from '~/assets/svg/plus.svg';
import notesActions from '~/plugins/notesActions';


export default {
  name: 'Notes',
  components: {
    AppNoteOne,
    iconPlus
  },
  mixins: [notesActions],
  computed: {
    notesFiltered() {
      return this.notes.filter(item => !item.trash);
    }
  },
};
</script>

<style lang="scss">
@import './Notes.scss';
</style>
