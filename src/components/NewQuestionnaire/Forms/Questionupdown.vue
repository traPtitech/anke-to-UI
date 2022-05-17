<template>
  <div>
    <Icon
      :class="[index === 0 ? $style.button : '']"
      name="chevron-up"
      @click="upQuestion"
    />
  </div>
  <div>
    <Icon
      :class="[index === max - 1 ? $style.button : '']"
      name="chevron-down"
      @click="downQuestion"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'QuestionUpdown',
  components: {
    Icon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    up: (index: number) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    down: (index: number) => true
  },
  setup(props, context) {
    const upQuestion = () => {
      context.emit('up', props.index)
    }
    const downQuestion = () => {
      context.emit('down', props.index)
    }
    return { upQuestion, downQuestion }
  }
})
</script>

<style lang="scss" module>
.button {
  pointer-events: none;
  color: red;
}
</style>
