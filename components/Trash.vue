<template lang="pug">
  .notes(:class="{ isReady }")
    .preloader(v-if="!isReady")
    .notes__head
      .title Trash
      .notes__head-actions
        transition-group.notes__head-info(
          mode="out-in"
          name="fade"
          tag="div"
          v-if="isShowInfo"
        )
          div(:key="1" v-if="isSaving")
            span Сохранение...
            .preloader 
          div(:key="2" v-else)
            span Изменения сохранены

    transition-group.row.gut.notes__container(
      mode="out-in"
      name="notes"
      tag="div"
      v-if="notes.length"
    )
      .col-3.col-t-6(
        v-for="(note, index) in notes"
        :key="note.id"
        v-if="note.trash"
      )
        app-note-one(
          ref="AppNoteOne"
          :note-index="index"
          :note="note"
          @set-background-note="setBackgroundNote"
          @add-title="addTitle(index)"
          @add-row="addRow(index)"
          @remove-row="removeRow"
          @toggle-check-row="toggleCheckRow"
          @remove-note="removeNoteAlways(index)"
          @input-text="inputText"
        )
    .title(v-else) Корзина пуста
</template>

<script>
import AppNoteOne from '~/components/NoteOne.vue';
import iconPlus from '~/assets/svg/plus.svg';
import notesActions from '~/plugins/notesActions';


export default {
  name: 'Notes',
  components: {
    AppNoteOne,
    iconPlus
  },
  mixins: [notesActions],
  created() {
    this.getServerData().then(res => {
      this.notes = [...res.notes].filter(item => item.trash === true);
      this.isReady = true;
      this.$nextTick(() => {
        this.isFirstLoad = false;
      })
    })
  },
};
</script>

<style lang="scss">
.notes {
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 4rem;
    @include mobile {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
    .title {
      margin: 0;
    }
  }

  &__head-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__head-info {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 4rem;
    margin-right: 4rem;
    opacity: 0.5;
    color: $gray;


    .preloader {
      position: absolute;
      right: 1rem;
      top: calc(50% - 1rem);
      width: 2rem;
      height: 2rem;
      &::before {
        content: '';
        position: static;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }

  &__add {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: $gray;
    opacity: 0.5;
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s $easeOutCubic;
    @include desktop {
      &:hover {
        opacity: 1;
      }
    }
    @include mobile {
      margin: 2rem 0 0;
    }
  }

  &__add-icon {
    margin: 0 1rem 0 0;
    font-size: 0;
    color: $gray;
    transition: color $trans;
    @include desktop {
      opacity: 0.5;
    }
    @include mobile {
      opacity: 1;
    }
    svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
}

</style>
