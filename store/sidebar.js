export const state = () => ({
  sidebarStatus: false
})

export const getters = {
  getSidebarStatus: state => state.sidebarStatus
}

export const mutations = {
  toggleSidebarStatus (state) {
    state.sidebarStatus = !state.sidebarStatus
  },
  closeSidebar (state) {
    if (state.sidebarStatus === true) {
      state.sidebarStatus = false
    }
  }
}

export default {
  state,
  mutations,
  getters
}
