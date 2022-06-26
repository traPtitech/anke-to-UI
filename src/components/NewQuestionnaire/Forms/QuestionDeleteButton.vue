<template>
  <Icon name="delete" :class="$style.deletebutton" @click="deleteQuestion" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'QuestionDeleteButton',
  components: {
    Icon
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: () => true
  },
  setup(props, context) {
    const deleteQuestion = () => {
      const isTrash = confirm('この質問を削除しますか？')
      if (isTrash) {
        context.emit('delete')
      }
    }
    return { deleteQuestion }
  }
})
</script>

<style lang="scss" module>
.deletebutton {
  cursor: pointer;
}
</style>
