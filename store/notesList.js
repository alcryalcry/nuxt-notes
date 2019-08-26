/* eslint-disable import/named */
import { HTTP } from '../plugins/http'
import { API_ROUTES_NOTES_LIST_GET, API_ROUTES_NOTES_LIST_SET } from '../plugins/constants'

export const state = () => ({
  notesList: []
})

export const getters = {
  getNotesList: state => state.notesList
}

export const mutations = {
  setNotesList (state, data) {
    state.notesList = [...JSON.parse(JSON.stringify(data))]
    window.localStorage.setItem('notes', JSON.stringify(data))
  }
}

export const actions = {
  getServerData ({ commit }, userId) {
    return HTTP.get(API_ROUTES_NOTES_LIST_GET, { user_id: userId })
      .then(({ data }) => {
        commit('setNotesList', data.notes)
        return data.notes
      })
      .catch((error) => {
        console.warn('No server response! Using localStorage.', API_ROUTES_NOTES_LIST_GET, error)
        let localNotes = []
        if (window.localStorage.getItem('notes')) {
          localNotes = JSON.parse(window.localStorage.getItem('notes'))
          commit('setNotesList', JSON.parse(window.localStorage.getItem('notes')))
        }
        return localNotes
      })
  },
  // eslint-disable-next-line no-unused-vars
  sendDataToServer ({ commit, getters }, userId) {
    window.localStorage.setItem('notes', JSON.stringify(getters.getNotesList))
    return HTTP.post(API_ROUTES_NOTES_LIST_SET, {
      user_id: userId,
      notes: getters.getNotesList
    })
      .then(({ data }) => {
        return data
      })
      .catch((error) => {
        return console.warn('No server response! Using localStorage.', API_ROUTES_NOTES_LIST_SET, error)
      })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
