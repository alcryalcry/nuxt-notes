import { mapActions, mapMutations } from 'vuex';
import { debounce } from 'throttle-debounce'

export default {
  data: () => ({
    notes: [],
    isSaving: false,
    isFirstLoad: true,
    isShowInfo: false,
    isReady: false
  }),
  mounted() {
    this.debounceSendData = debounce(1500, () => {
      this.setNotesList(this.notes)
      this.sendDataToServer().then(res => {
        console.log('ИЗМЕНЕНИЯ СОХРАНЕНЫ', res);
      })
      .catch(error => {
        console.error(error);
        this.isShowInfo = false;
      })
      .then(() => {
        this.isSaving = false;
      })
    });
  },
  watch: {
    notes: {
      handler: function (val) {
        if (this.isFirstLoad) return;
        if (!this.isShowInfo) this.isShowInfo = true;

        this.isSaving = true;
        this.debounceSendData(val)
      },
      deep: true,
    }
  },
  methods: {
    ...mapMutations('notesList', ['setNotesList']),
    ...mapActions('notesList', ['getServerData', 'sendDataToServer']),

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

      this.notes[noteIndex].rows[rowIndex].checked = !this.notes[noteIndex].rows[rowIndex].checked;
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

    removeNoteToTrash(noteIndex) {
      this.notes[noteIndex].trash = true;
    },

    removeNoteAlways(noteIndex) {
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
}