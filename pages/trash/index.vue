<template lang="pug">
  div
    notes(title="Trash" :isTrash="true")

</template>

<script>
import Notes from '~/components/Notes/Notes.vue'

export default {
  components: {
    Notes
  }
}
</script>
