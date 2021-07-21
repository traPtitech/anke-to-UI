<template>
  <textarea
    type="text"
    :class="$style.textarea"
    :value="modelValue"
    placeholder="回答"
    @input="update"
    @keydown="resize"
    @focusin="focus"
    @focusout="focus"
  />
  <input-underline :is-focused="isFocused" :class="$style.underline" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import InputUnderline from '/@/components/UI/InputUnderline.vue'
import { resize } from './use/question'

export default defineComponent({
  name: 'QuestionTextarea',
  components: { InputUnderline },
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

    const isFocused = ref(false)
    const focus = () => {
      isFocused.value = !isFocused.value
    }

    return { resize, update, isFocused, focus }
  }
})
</script>

<style lang="scss" module>
$textarea-border: 1px;
$textarea-padding: 4px;
$underline-margin: calc(-1 * (#{$textarea-border} + #{$textarea-padding}));

.textarea {
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  line-height: 1.7rem;
  border: none;
  resize: none;
  outline: 0;
  padding: $textarea-padding;
  border-bottom: $textarea-border dotted #7c6c4d;
}
.underline {
  margin-top: $underline-margin;
}
</style>
