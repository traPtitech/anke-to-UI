<template>
  <div :class="$style.container">
    <div :class="$style.leftLabel">{{ leftLabel }}</div>
    <label v-for="(num, index) in range" :key="index">
      <radio-button
        :is-selected="index === selectedIndex"
        :disabled="disabled"
        @input="update(index)"
      />
    </label>
    <div :class="$style.rightLabel">{{ rightLabel }}</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import RadioButton from '/@/components/UI/RadioButton.vue'

export default defineComponent({
  name: 'LinearScale',
  components: {
    RadioButton
  },
  props: {
    range: {
      type: Array as PropType<number[]>,
      required: true
    },
    leftLabel: {
      type: String,
      required: true
    },
    rightLabel: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (v: number) => true
  },
  setup(props, context) {
    const selectedIndex = computed(() => {
      return props.range.indexOf(props.modelValue)
    })
    const update = (index: number) => {
      context.emit('update:modelValue', props.range[index])
    }

    return { selectedIndex, update }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.leftLabel {
  margin-right: 0.5rem;
}
.rightLabel {
  margin-left: 0.5rem;
}
</style>
