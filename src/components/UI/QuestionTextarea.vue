<template>
  <textarea
    type="text"
    :class="$style.textarea"
    :value="modelValue"
    placeholder="回答"
    @input="update"
    @keydown="resize"
  />
  <div :class="$style.underline"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resize } from './use/question'

export default defineComponent({
  name: 'QuestionTextarea',
  props: {
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

    return { update, resize }
  }
})
</script>

<style lang="scss" module>
.textarea {
  box-sizing: border-box;
  width: 100%;
  border: none;
  resize: none;
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
  margin: -5px 0;
  background-color: #7c6c4d;
  transform: scaleX(0);
  transition: transform 0.1s;
}
</style>
