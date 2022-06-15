<template>
  <input
    :type="isNumber ? 'number' : 'text'"
    :class="$style.input"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="update"
  />
  <input-focus-underline :class="$style.underline" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputFocusUnderline from './InputFocusUnderline.vue'

export default defineComponent({
  name: 'InputText',
  components: {
    InputFocusUnderline
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    isNumber: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string) => true
  },
  setup(props, context) {
    const update = (e: InputEvent) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return { update }
  }
})
</script>

<style lang="scss" module>
$input-border: 1px;
$underline-margin: -1 * $input-border;
.input {
  padding: 4px;
  width: 100%;
  height: 26px;
  font-size: 16px;
  line-height: 18px;
  color: $ui-primary;
  box-sizing: border-box;
  border: none;
  border-bottom: $input-border solid $ui-secondary;
  outline: none;
  &::placeholder {
    padding: 6px 4px;
    width: 100%;
    height: 26px;
    font-size: 12px;
    line-height: 14px;
    color: $ui-secondary;
  }
}
.underline {
  margin-top: $underline-margin;
}
</style>
