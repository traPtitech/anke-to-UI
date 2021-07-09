<template>
  <input
    type="number"
    :class="$style.input"
    :value="modelValue"
    placeholder="数値を入力"
    @input="update"
  />
  <div :class="$style.underline"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionInputNumber',
  props: {
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
    const update = (e: InputEvent) => {
      context.emit(
        'update:modelValue',
        Number((e.target as HTMLInputElement).value)
      )
    }

    return { update }
  }
})
</script>

<style lang="scss" module>
.input {
  box-sizing: border-box;
  width: 100%;
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
