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
    swap: (i: number, parameter: number) => true
  },
  setup(props, context) {
    const upQuestion = () => {
      context.emit('swap', props.index, -1)
    }
    const downQuestion = () => {
      context.emit('swap', props.index, +1)
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
