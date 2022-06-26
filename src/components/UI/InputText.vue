<template>
  <div :class="[isNumber ? $style.spin : '']">
    <input
      :type="isNumber ? 'number' : 'text'"
      :class="[
        isLong ? $style.longtext : '',
        nonEvents ? $style.pointerevents : '',
        isNumber ? $style.number : '',
        $style.input
      ]"
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
    isLong: {
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
.pointerevents {
  pointer-events: none;
}
.longtext {
  height: 29px;
}
.underline {
  margin-top: $underline-margin;
}
.number {
  &::-webkit-inner-spin-button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 8px;
    margin: auto;
    transform: scale(1.6);
    transform-origin: right center;
    opacity: 0;
    cursor: pointer;
  }
  &::-webkit-contacts-auto-fill-button {
    opacity: 0;
  }
}
.spin {
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
