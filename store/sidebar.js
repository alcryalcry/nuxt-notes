export default {
  namespaced: true,
  state: {
    sidebarStatus: false
  },
  getters: {
    getSidebarStatus: state => state.sidebarStatus,
  },
  mutations: {
    toggleSidebarStatus(state){
      state.sidebarStatus = !state.sidebarStatus;
    },
    closeSidebar(state){
      if (state.sidebarStatus === true) {
        state.sidebarStatus = false;
      }
    }
  },
};
