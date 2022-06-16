<template>
  <Icon name="delete" @click="deleteQuestion" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'QuestionDispose',
  components: {
    Icon
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: (index: number) => true
  },
  setup(props, context) {
    const deleteQuestion = () => {
      const isTrash = confirm('この質問を削除しますか？')
      if (isTrash) {
        context.emit('delete', props.index)
      }
    }
    return { deleteQuestion }
  }
})
</script>

<style lang="scss" module></style>
