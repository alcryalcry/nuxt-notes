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
  }
}

export const actions = {
  getServerData ({ commit }, userId) {
    return HTTP.get(API_ROUTES_NOTES_LIST_GET, { user_id: userId })
      .then(({ data }) => {
        commit('setNotesList', data.notes)
        return data
      })
      .catch(error => console.error(API_ROUTES_NOTES_LIST_GET, error))
  },
  // eslint-disable-next-line no-unused-vars
  sendDataToServer ({ commit, getters }, userId) {
    return HTTP.post(API_ROUTES_NOTES_LIST_SET, {
      user_id: userId,
      notes: getters.getNotesList
    })
      .then(({ data }) => {
        return data
      })
      .catch(error => console.error(API_ROUTES_NOTES_LIST_SET, error))
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
