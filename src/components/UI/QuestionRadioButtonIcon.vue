<template>
  <div :class="[disabled ? $style.disabledbutton : '', $style.button]">
    <div :class="[isSelected ? $style.selected : '', $style.innerButton]" />
  </div>
  <input type="radio" name="radio" :class="$style.input" @input="onInput" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RadioButton',
  props: {
    isSelected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    input: () => true
  },
  setup(props, context) {
    const onInput = () => {
      context.emit('input')
    }

    return { onInput }
  }
})
</script>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: solid 2px $ui-secondary;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
}
.innerButton {
  width: 75%;
  height: 75%;
  background-color: $ui-primary;
  border-radius: 50%;
  transition: transform 0.1s;
  transform: scale(0);
}
.selected {
  transform: scale(1);
}
.disabledbutton {
  background-color: $ui-secondary;
  cursor: not-allowed;
  &:hover {
    opacity: 1;
  }
}
.input {
  appearance: none;
}
</style>
