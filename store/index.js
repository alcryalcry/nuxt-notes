import Vue from 'vue';
import Vuex from 'vuex';

// modules
import sidebar from './sidebar';
import notesList from './notes-list';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    userId: 1,
  },
  modules: {
    sidebar,
    notesList
  }
});

export default store;
