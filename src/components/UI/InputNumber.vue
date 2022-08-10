<template>
  <div :class="$style.container">
    <input-base-with-underline>
      <input-base
        :is-number="true"
        :disabled="disabled"
        :placeholder="placeholder"
        :model-value="modelValue"
      />
    </input-base-with-underline>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputBase from './InputBase.vue'
import InputBaseWithUnderline from './InputBaseWithUnderline.vue'

export default defineComponent({
  name: 'InputNumber',
  components: {
    InputBase,
    InputBaseWithUnderline
  },
  props: {
    placeholder: {
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
    'update:modelValue': (value: number) => true
  },
  setup(props, context) {
    const update = (value: string) => {
      context.emit('update:modelValue', Number(value))
    }
    return { update }
  }
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  &::before {
    position: absolute;
    width: 24px;
    height: 12px;
    border-radius: 4px 4px 0 0;
    top: 4px;
    right: 8px;
    color: $ui-primary;
    font-size: 10px;
    content: '▲';
    &:content {
      transform: scale(2, 0.5);
    }
    border: 1px solid $ui-secondary;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    width: 24px;
    height: 12px;
    border-radius: 0 0 4px 4px;
    bottom: 5px;
    right: 8px;
    color: $ui-primary;
    font-size: 10px;
    content: '▼';
    border: 1px solid $ui-secondary;
    pointer-events: none;
  }
}
</style>
