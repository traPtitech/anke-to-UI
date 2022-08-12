<template>
  <input
    v-focus="isFocus"
    :type="isNumber ? 'number' : 'text'"
    :class="[
      $style.input,
      disabled ? $style.disabled : '',
      isHover ? $style.hover : '',
      isNumber ? $style.number : ''
    ]"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="modelValue"
    @input="update"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputBase',
  directives: {
    focus: {
      mounted(el, isfocus) {
        if (isfocus.value) {
          el.focus()
        }
      }
    }
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
    isFocus: {
      type: Boolean,
      default: false
    },
    isHover: {
      type: Boolean,
      default: true
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
  &:focus {
    background-color: $bg-secondary-highlight;
    transition: 0.1s;
  }
}
.hover:hover {
  background-color: $bg-secondary-highlight;
  transition: 0.1s;
}
.disabled {
  pointer-events: none;
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
</style>