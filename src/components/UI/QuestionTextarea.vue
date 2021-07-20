<template>
  <textarea
    type="text"
    :class="$style.textarea"
    :value="modelValue"
    placeholder="回答"
    @input="update"
    @keydown="resize"
  />
  <input-underline :class="$style.underline" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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

    return { update, resize }
  }
})
</script>

<style lang="scss" module>
$text-area-border: 1px;
$text-area-padding: 4px;
$underline-margin: calc(-1 * (#{$text-area-border} + #{$text-area-padding}));

.textarea {
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  line-height: 1.7rem;
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
  margin-top: #{$underline-margin};
}
</style>
