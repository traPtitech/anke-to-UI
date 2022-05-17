<template>
  <div>
    <Icon name="trash-can-outline" @click="deleteQuestion" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'Questionupdown',
  components: {
    Icon
  },
  props: {
    questionarray: {
      type: Array,
      required: true
    },
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
      const trash = confirm('この質問を削除しますか？')
      if (trash) {
        context.emit('delete', props.index)
      }
    }
    return { deleteQuestion }
  }
})
</script>

<style lang="scss" module>
.input {
  appearance: none;
}
</style>
