import { HTTP } from '../plugins/http';
import { API_ROUTES_NOTES_LIST_GET, API_ROUTES_NOTES_LIST_ADD } from '../plugins/constants';
/* eslint-disable */
export default {
  namespaced: true,
  state: {
    notesList: [],
  },
  getters: {
    getNotesList: state => state.notesList,
  },
  mutations: {
    setNotesList(state, data) {
      state.notesList = data;
    },
  },
  actions: {
    getServerData({ commit }, userId) {
      return HTTP.get(API_ROUTES_NOTES_LIST_GET, { user_id: userId })
        .then(({ data }) => {
          commit('setNotesList', data.notes);
          return data;
        })
        .catch(error => console.error(API_ROUTES_NOTES_LIST_GET, error));
    },
    sendDataToServer({ commit, getters }, userId) {
      return HTTP.post(API_ROUTES_NOTES_LIST_ADD, { 
        user_id: userId,
        notes:  getters.getNotesList
      })
      .then(({ data }) => {
        return data;
      })
      .catch(error => console.error(API_ROUTES_NOTES_LIST_ADD, error));
    },
  }
};
