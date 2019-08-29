/* eslint-disable import/named */
export const state = () => ({
  notesList: []
})

export const getters = {
  GET_NOTES_LIST: state => state.notesList
}

export const mutations = {
  SET_NOTES_LIST (state, data) {
    state.notesList = [...JSON.parse(JSON.stringify(data))]
    window.localStorage.setItem('notes', JSON.stringify(data))
  }
}

export const actions = {
  GET_SERVER_DATA ({ commit }) {
    let localNotes = []
    if (window.localStorage.getItem('notes')) {
      localNotes = JSON.parse(window.localStorage.getItem('notes'))
      commit('SET_NOTES_LIST', JSON.parse(window.localStorage.getItem('notes')))
    }
    return localNotes
  },
  // eslint-disable-next-line no-unused-vars
  SEND_DATA_TO_SERVER ({ commit, getters }) {
    window.localStorage.setItem('notes', JSON.stringify(getters.GET_NOTES_LIST))
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
