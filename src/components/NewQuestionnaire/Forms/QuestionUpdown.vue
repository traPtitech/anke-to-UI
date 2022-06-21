<template>
  <div :class="$style.icon">
    <Icon
      :class="[upDisable ? $style.button : '']"
      name="chevron-up"
      @click="upQuestion"
    />
    <Icon
      :class="[downDisable ? $style.button : '']"
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
    upDisable: {
      type: Boolean,
      required: true
    },
    downDisable: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    swap: (index: number) => true
  },
  setup(props, context) {
    const upQuestion = () => {
      context.emit('swap', -1)
    }
    const downQuestion = () => {
      context.emit('swap', +1)
    }
    return { upQuestion, downQuestion }
  }
})
</script>

<style lang="scss" module>
.button {
  pointer-events: none;
  color: $ui-secondary;
}
.icon {
  display: flex;
  flex-direction: column;
}
</style>
