<template lang="pug">
  div(:class="{'isSidebarOpen': GET_SIDEBAR_STATUS}")
    app-sidebar
    nuxt(class="page-content")

</template>

<script>
import { mapGetters } from 'vuex'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import AppSidebar from '~/components/Sidebar/Sidebar.vue'

export default {
  components: {
    AppSidebar
  },
  computed: {
    ...mapGetters({
      GET_SIDEBAR_STATUS: 'sidebar/GET_SIDEBAR_STATUS'
    }),
    scrollBarOptions () {
      return {
        reserveScrollBarGap: true
      }
    }
  },
  watch: {
    GET_SIDEBAR_STATUS (value) {
      if (value) {
        disableBodyScroll(document.querySelector('body'), this.scrollBarOptions)
        return false
      }
      clearAllBodyScrollLocks()
    }
  }
}
</script>

<style lang="scss"></style>
