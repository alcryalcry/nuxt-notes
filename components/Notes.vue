<template lang="pug">
  .notes
    .notes__head
      .title Notes
      button.notes__add(@click="addNote")
        .notes__add-icon
          icon-plus
        | New note

    transition-group.row.gut.notes__container(
      mode="out-in"
      name="notes"
      tag="div"
      v-if="getNotesList"
    )
      .col-3.col-t-6(
        v-for="(note, index) in getNotesList"
        :key="note.id"
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
          @remove-note="removeNote(index)"
          @input-text="inputText"
        )
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import AppNoteOne from '~/components/NoteOne.vue';
import iconPlus from '~/assets/svg/plus.svg';


export default {
  name: 'Notes',
  components: {
    AppNoteOne,
    iconPlus
  },
  data() {
    return {
      // notes: []
    };
  },
  computed: {
    ...mapGetters('notesList', ['getNotesList']),
  },
  created() {
    this.getServerData();
  },
  methods: {
    ...mapActions('notesList', ['getServerData']),
    ...mapMutations('notesList', ['setNotesList']),

    inputText(data) {
      const noteIndex = data[0];
      const rowIndex = data[1];
      const text = data[2];

      if (rowIndex === 'title') {
        this.notes[noteIndex].title = text;
        return;
      }

      this.notes[noteIndex].rows[rowIndex].text = text;
    },

    addTitle(noteIndex) {
      this.notes[noteIndex].title = '';
      this.setFocusToRow(noteIndex, true);
    },

    addRow(noteIndex) {
      this.notes[noteIndex].rows.push({
        id: this.setUniqueId(this.notes[noteIndex].rows),
        text: '',
        checked: false
      });
      this.setFocusToRow(noteIndex);
    },

    removeRow(data) {
      const rowIndex = data[0];
      const noteIndex = data[1];

      if (rowIndex === 'title') {
        this.notes[noteIndex].title = false;
        return;
      }
      this.notes[noteIndex].rows.splice(rowIndex, 1);
    },

    toggleCheckRow(data) {
      const rowIndex = data[0];
      const noteIndex = data[1];

      this.notes[noteIndex].rows[rowIndex].checked = !this.notes[noteIndex]
        .rows[rowIndex].checked;
    },

    addNote() {
      this.notes.push({
        id: this.setUniqueId(this.notes),
        background: '',
        title: false,
        rows: [
          {
            id: 0,
            text: '',
            checked: false
          }
        ]
      });
      this.setFocusToRow(this.notes.length - 1);
    },

    removeNote(noteIndex) {
      this.notes.splice(noteIndex, 1);
    },

    setFocusToRow(noteIndex, title) {
      this.$nextTick(() => {
        if (!title) {
          this.$refs.AppNoteOne[noteIndex].setFocusToRow(
            this.notes[noteIndex].rows.length
          );
          return;
        }
        this.$refs.AppNoteOne[noteIndex].setFocusToRow('title');
      })
    },

    setBackgroundNote(data) {
      const noteIndex = data[0];
      const background = data[1];

      this.notes[noteIndex].background = background;
    },

    setUniqueId(arr) {
      let ids = arr.map(item => item.id);
      let newId = 0;

      for (let i = 0; ids.indexOf(i) !== -1; i++) {
        newId = i + 1;
      }

      return newId;
    }
  }
};
</script>

<style lang="scss">
.notes {
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 4rem;

    @include mq(767) {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }

    .title {
      margin: 0;
    }
  }

  &__add {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: $gray;
    opacity: 0.5;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s $easeOutCubic;

    @include mq(1024, 9999) {
      &:hover {
        opacity: 1;
      }
    }

    @include mq(767) {
      margin: 2rem 0 0;
    }
  }

  &__add-icon {
    margin: 0 1rem 0 0;
    font-size: 0;
    color: $gray;
    transition: color $trans;

    @include mq(1024, 9999) {
      opacity: 0.5;
    }

    @include mq(767) {
      opacity: 1;
    }

    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}
</style>
