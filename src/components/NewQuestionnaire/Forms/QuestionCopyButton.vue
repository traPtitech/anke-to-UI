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
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    copy: () => true
  },
  setup(props, context) {
    const copyQuestion = () => {
      context.emit('copy')
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
