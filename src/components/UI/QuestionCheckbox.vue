<template>
  <div :class="$style.container">
    <label
      v-for="(content, index) in contents"
      :key="index"
      :class="$style.label"
    >
      <span :class="$style.check">
        <icon
          name="check"
          :class="[isChecked(index) ? $style.checked : '', $style.icon]"
        />
      </span>
      <input type="checkbox" :class="$style.checkbox" @input="check(index)" />
      <p :class="$style.content">{{ content }}</p>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'QuestionCheckbox',
  components: {
    Icon
  },
  props: {
    contents: {
      type: Array as PropType<string[]>,
      required: true
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
    const isChecked = (index: number) =>
      props.modelValue?.includes(props.contents[index])

    const check = (index: number) => {
      const content = props.contents[index]
      const checkedContents = props.modelValue || []
      if (checkedContents.includes(content)) {
        checkedContents.splice(checkedContents.indexOf(content), 1)
      } else {
        checkedContents.push(content)
      }

      context.emit('update:modelValue', checkedContents)
    }

    return { check, isChecked }
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
    margin: 0 0.5rem 0 0.25rem;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
.check {
  display: inline-block;
  cursor: pointer;
  content: '';
  height: 1rem;
  width: 1rem;
  border: 1px solid #7c6c4d;
  border-radius: 0.2rem;
  .icon {
    opacity: 0;
    color: #625c3d;
    height: 100%;
    width: 100%;
    transition: 0.2s;
  }
  .checked {
    opacity: 1;
  }
}
.checkbox {
  appearance: none;
}
</style>
