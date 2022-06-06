<template>
  <div :class="$style.container">
    <label
      v-for="(content, index) in contents"
      :key="index"
      :class="[disabled ? $style.disabledlabel : '', $style.label]"
    >
      <Checkbox
        :disabled="false"
        :index="index"
        :is-checked="isChecked(index)"
        @update:check="updatecheck"
      />
      <p :class="$style.content">
        {{ content }}
      </p>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Checkbox from './Checkbox.vue'

export default defineComponent({
  name: 'QuestionCheckbox',
  components: { Checkbox },
  props: {
    contents: {
      type: Array as PropType<string[]>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (v: string[]) => true
  },
  setup(props, context) {
    const updatecheck = (index: number) => {
      const content = props.contents[index]
      const checkedContents = props.modelValue || []
      if (checkedContents.includes(content)) {
        checkedContents.splice(checkedContents.indexOf(content), 1)
      } else {
        checkedContents.push(content)
      }

      context.emit('update:modelValue', checkedContents)
    }
    const isChecked = (index: number) => {
      return props.modelValue?.includes(props.contents[index])
    }

    return { updatecheck, isChecked }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
}
.label {
  display: flex;
  flex-direction: row;
  margin: 0.2rem 0;
  .content {
    margin: 0;
    margin-left: 0.4rem;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
.disabledlabel {
  &:hover {
    cursor: not-allowed;
    opacity: 1;
  }
}
</style>
