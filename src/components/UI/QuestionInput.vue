<template>
  <input
    :type="isNumber ? 'number' : 'text'"
    :class="$style.input"
    :value="modelValue"
    :placeholder="isNumber ? '数値を入力' : '回答'"
    @input="update"
  />
  <div :class="$style.underline"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionInput',
  props: {
    isNumber: {
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
.input {
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  border: none;
  outline: 0;
  padding: 0.4rem;
  border-bottom: 1px dotted #7c6c4d;
  &:focus + .underline {
    transform: scaleX(1);
  }
}
.underline {
  width: 100%;
  height: 2px;
  margin-top: -1px;
  background-color: #7c6c4d;
  transform: scaleX(0);
  transition: transform 0.1s;
}
</style>
