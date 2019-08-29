export const state = () => ({
  sidebarStatus: false
})

export const getters = {
  GET_SIDEBAR_STATUS: state => state.sidebarStatus
}

export const mutations = {
  TOGGLE_SIDEBAR_STATUS (state) {
    state.sidebarStatus = !state.sidebarStatus
  },
  CLOSE_SIDEBAR (state) {
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
