<template>
  <div>
    <input
      :type="isNumber ? 'number' : 'text'"
      :class="[$style.input, disabled ? $style.disabled : '']"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="update"
    />
    <input-focus-underline :class="$style.underline" />
  </div>
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
    nonEvents: {
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
  padding: 4px 8px;
  width: 100%;
  height: 32px;
  @include size-body;
  color: $ui-primary;
  box-sizing: border-box;
  border: none;
  border-bottom: $input-border solid $ui-secondary;
  outline: none;
  &::placeholder {
    padding: 4px 8px;
    width: 100%;
    height: 24px;
    @include size-body-small;
    color: $ui-secondary;
  }
  &:hover {
    background-color: $bg-secondary-highlight;
    transition: 0.1s;
  }
  &:focus {
    background-color: $bg-secondary-highlight;
  }
}
.disabled {
  pointer-events: none;
}
.underline {
  margin-top: $underline-margin;
}
</style>
