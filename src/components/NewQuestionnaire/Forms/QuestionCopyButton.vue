<template>
  <Icon
    name="content-duplicate"
    :class="$style.copybutton"
    @click="copyQuestion"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'QuestionCopyButton',
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
    const copyQuestion = () => {
      context.emit('copy', props.index)
    }
    return { copyQuestion }
  }
})
</script>

<style lang="scss" module>
.copybutton {
  cursor: pointer;
}
</style>
