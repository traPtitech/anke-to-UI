<template>
  <textarea
    type="text"
    :class="$style.textarea"
    :value="modelValue"
    placeholder="回答"
    :disabled="disabled"
    @input="update"
    @keydown="resize"
  />
  <input-focus-underline :class="$style.underline" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputFocusUnderline from '/@/components/UI/InputFocusUnderline.vue'
import { resize } from './use/question'

export default defineComponent({
  name: 'QuestionTextarea',
  components: { InputFocusUnderline },
  props: {
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
    const update = (e: Event) => {
      context.emit('update:modelValue', (e.target as HTMLInputElement).value)
    }

    return { resize, update }
  }
})
</script>

<style lang="scss" module>
$textarea-border: 1px;
$textarea-padding: 4px;
$underline-margin: -1 * ($textarea-border + $textarea-padding);

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
