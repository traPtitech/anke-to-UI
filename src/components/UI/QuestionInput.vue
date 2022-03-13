<template>
  <input
    v-if="disable === true"
    :type="isNumber ? 'number' : 'text'"
    :class="$style.input"
    :placeholder="isNumber ? '数値を入力' : '回答'"
    disabled
  />
  <input
    v-else
    :type="isNumber ? 'number' : 'text'"
    :class="$style.input"
    :value="modelValue"
    :placeholder="isNumber ? '数値を入力' : '回答'"
    @input="update"
  />
  <input-underline :class="$style.underline" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import InputUnderline from '/@/components/UI/InputUnderline.vue'

export default defineComponent({
  name: 'QuestionInput',
  components: {
    InputUnderline
  },
  props: {
    isNumber: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      required: true
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
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  border: none;
  outline: 0;
  padding: 0.4rem;
  border-bottom: $input-border dotted #7c6c4d;
}
.underline {
  margin-top: $underline-margin;
}
</style>
