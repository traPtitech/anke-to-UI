<template>
  <div :class="$style.button">
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
      required: true
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
  content: '';
  width: 1rem;
  height: 1rem;
  border: solid 1px #7c6c4d;
  border-radius: 50%;
  cursor: pointer;
  .innerButton {
    content: '';
    width: 75%;
    height: 75%;
    background-color: #7c6c4d;
    border-radius: 50%;
    transition: transform 0.1s;
    transform: scale(0);
  }
  .selected {
    transform: scale(1);
  }
  &:hover {
    opacity: 0.6;
  }
}
.input {
  appearance: none;
}
</style>
