<template lang="pug">
  nav.sidebar(v-on-clickaway="CLOSE_SIDEBAR")
    button.hamburger(@click="TOGGLE_SIDEBAR_STATUS")
      icon-burger
    a.sidebar__logo(href="https://main.alcryalcry.now.sh/")
      logo-nuxt
    .sidebar__section-wrapper
      .sidebar__section( v-for="(section, i) in menuSections" :key="i" )
        .sidebar__title {{ section.title }}
        .sidebar__list
          li( v-for="(link, i) in section.items" :key="i" )
            nuxt-link.sidebar__link( :to="link.href" @click.native="CLOSE_SIDEBAR" )
              .sidebar__link-icon
                component(:is="link.icon")
              .sidebar__link-text {{ link.text }}

    a.sidebar__bottom(
      href="https://github.com/alcryalcry"
      target="_blank"
    )
      .sidebar__bottom-icon
        icon-git
      .sidebar__bottom-text I'm on <br >GitHub

</template>

<script>
import { mapMutations } from 'vuex'

import { mixin as clickaway } from 'vue-clickaway'
import iconBurger from '~/assets/svg/burger.svg'
import iconGit from '~/assets/svg/github.svg'
import iconNotes from '~/assets/svg/notes.svg'
import iconTrash from '~/assets/svg/trash.svg'
import logoNuxt from '~/assets/svg/logo-nuxt.svg'

export default {
  name: 'Sidebar',
  components: {
    iconBurger,
    iconGit,
    iconNotes,
    iconTrash,
    logoNuxt
  },
  mixins: [clickaway],
  data () {
    return {
      menuSections: [
        {
          title: 'Views',
          items: [
            {
              href: '/',
              text: 'Notes',
              icon: iconNotes
            },
            {
              href: '/trash',
              text: 'Trash',
              icon: iconTrash
            }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapMutations({
      TOGGLE_SIDEBAR_STATUS: 'sidebar/TOGGLE_SIDEBAR_STATUS',
      CLOSE_SIDEBAR: 'sidebar/CLOSE_SIDEBAR'
    })
  }
}
</script>

<style lang="scss">
@import './Sidebar.scss';
</style>
