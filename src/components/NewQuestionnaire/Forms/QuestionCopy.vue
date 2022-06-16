<template>
  <Icon name="content-duplicate" @click="deleteQuestion" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'QuestionCopy',
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
    copy: (index: number) => true
  },
  setup(props, context) {
    const deleteQuestion = () => {
      context.emit('copy', props.index)
    }
    return { deleteQuestion }
  }
})
</script>

<style lang="scss" module></style>
