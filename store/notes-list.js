import { HTTP } from '../plugins/http';
import { API_ROUTES_NOTES_LIST } from '../plugins/constants';

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
      state.notesList = data.notes;
    },
  },
  actions: {
    getServerData({ commit }, userId) {
      return HTTP.get(API_ROUTES_NOTES_LIST, { user_id: userId })
        .then(({ data }) => {
          commit("setNotesList", data);
        })
        .catch(error => console.error(API_ROUTES_NOTES_LIST, error));
    },
  }
};
