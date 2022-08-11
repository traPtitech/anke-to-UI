<template>
  <div :class="$style.container">
    <label
      v-for="(content, index) in contents"
      :key="index"
      :class="$style.label"
    >
      <radio-button
        :is-selected="index === selectedIndex"
        :disabled="disabled"
        @input="update(index)"
      />
      <div :class="$style.content">
        {{ content }}
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import RadioButton from '/@/components/UI/QuestionRadioButtonIcon.vue'

export default defineComponent({
  name: 'QuestionRadio',
  components: {
    RadioButton
  },
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
      type: String,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (v: string) => true
  },
  setup(props, context) {
    const selectedIndex = computed(() => {
      return props.contents.indexOf(props.modelValue)
    })
    const update = (index: number) => {
      context.emit('update:modelValue', props.contents[index])
    }

    return { selectedIndex, update }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.label {
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
}
.content {
  @include size-body;
  margin-left: 8px;
}
</style>
