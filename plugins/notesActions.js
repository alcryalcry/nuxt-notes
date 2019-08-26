import { mapGetters, mapActions, mapMutations } from 'vuex'
import { debounce } from 'throttle-debounce'
import grid from '~/plugins/grid'

// ЭТОТ МИКСИН НУЖЕН, ЧТОБЫ НЕ ПОВТОРЯТЬ МЕТОДЫ В ДВУХ КОМПОНЕНТАХ

export default {
  data: () => ({
    notes: [],
    isSaving: false,
    isFirstLoad: true,
    isShowInfo: false,
    isReady: false
  }),
  created () {
    this.getServerData().then((notes) => {
      this.notes = JSON.parse(JSON.stringify(notes))
    }).then(() => {
      this.isReady = true
      this.$nextTick(() => {
        this.isFirstLoad = false
        grid(this.$refs.gridItems)
      })
    })
  },
  computed: {
    ...mapGetters({
      getSidebarStatus: 'sidebar/getSidebarStatus'
    })
  },
  mounted () {
    this.stickyHeader()
    window.addEventListener('scroll', debounce(25, this.stickyHeader), false)

    this.debounceSendData = debounce(1000, () => {
      this.setNotesList(JSON.parse(JSON.stringify(this.notes)))
      this.sendDataToServer().then((res) => {
      })
        .catch((error) => {
          console.error(error)
          this.isShowInfo = false
        })
        .then(() => {
          this.isSaving = false
        })
    })
  },
  watch: {
    getSidebarStatus () {
      this.stickyHeader()
    },
    notes: {
      handler (val) {
        if (this.isFirstLoad) { return }
        if (!this.isShowInfo) { this.isShowInfo = true }

        this.isSaving = true
        this.debounceSendData(val)
        grid(this.$refs.gridItems)
      },
      deep: true
    }
  },
  methods: {
    ...mapGetters({
      getNotesList: 'notesList/getNotesList'
    }),
    ...mapMutations({
      setNotesList: 'notesList/setNotesList'
    }),
    ...mapActions({
      getServerData: 'notesList/getServerData',
      sendDataToServer: 'notesList/sendDataToServer'
    }),

    stickyHeader () {
      const wrapper = this.$refs.header
      if (wrapper) {
        if (window.pageYOffset > 30) {
          wrapper.classList.add('isScrolled')
        } else if (window.pageYOffset < 20) {
          wrapper.classList.remove('isScrolled')
        }
      }
    },

    getNoteById (id) {
      return this.notes.find(note => note.id === id)
    },

    getIndexById (id) {
      return this.notes.findIndex(note => note.id === id)
    },

    getFilteredIndexById (id) {
      return this.notesFiltered.findIndex(note => note.id === id)
    },

    inputText (data) {
      const currentNote = this.getNoteById(data[0])
      const rowIndex = data[1]
      const text = data[2]

      if (rowIndex === 'title') {
        currentNote.title = text
        return
      }

      currentNote.rows[rowIndex].text = text
    },

    addTitle (id) {
      const currentNote = this.getNoteById(id)
      const noteIndex = this.getFilteredIndexById(id)
      currentNote.title = ''
      this.setFocusToRow(noteIndex, true)
    },

    addRow (id) {
      const noteIndex = this.getFilteredIndexById(id)
      const currentNote = this.getNoteById(id)
      const newId = this.setUniqueId()

      currentNote.rows.push({
        id: newId,
        text: '',
        checked: false
      })
      this.setFocusToRow(noteIndex)
    },

    removeRow (data) {
      const currentNote = this.getNoteById(data[0])
      const rowIndex = data[1]

      if (rowIndex === 'title') {
        currentNote.title = false
        return
      }
      currentNote.rows.splice(rowIndex, 1)
    },

    toggleCheckRow (data) {
      const currentNote = this.getNoteById(data[0])
      const rowIndex = data[1]

      currentNote.rows[rowIndex].checked = !currentNote.rows[rowIndex].checked
    },

    addNote () {
      const newId = this.setUniqueId()
      this.notes.push({
        id: newId,
        background: '',
        title: false,
        trash: false,
        rows: [
          {
            id: 0,
            text: '',
            checked: false
          }
        ]
      })
      this.setFocusToRow(this.notesFiltered.length - 1)
    },

    removeNote (id) {
      const noteIndex = this.getIndexById(id)

      if (this.isTrash) {
        this.notes.splice(noteIndex, 1)
      } else {
        // need force update for reactive
        const trashedNote = {
          ...this.getNoteById(id),
          trash: true
        }
        this.notes.splice(noteIndex, 1, trashedNote)
      }
    },

    setFocusToRow (noteIndex, title) {
      this.$nextTick(() => {
        if (!title) {
          this.$refs.AppNoteOne[noteIndex].setFocusToRow(
            this.notesFiltered[noteIndex].rows.length
          )
          return
        }
        this.$refs.AppNoteOne[noteIndex].setFocusToRow('title')
      })
    },

    setBackgroundNote (data) {
      const currentNote = this.getNoteById(data[0])
      const background = data[1]

      currentNote.background = background
    },

    setUniqueId () {
      return Math.random().toString(36).substr(2, 9)
    }
  }
}
