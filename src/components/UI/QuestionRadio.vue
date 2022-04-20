<template>
  <div :class="$style.container">
    <label
      v-for="(content, index) in contents"
      :key="index"
      :class="[disable ? $style.disablelabel : '', $style.label]"
    >
      <radio-button
        :is-selected="index === selectedIndex"
        :disable="disable"
        @input="update(index)"
      />
      <p :class="$style.content">
        {{ content }}
      </p>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import RadioButton from '/@/components/UI/RadioButton.vue'

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
  padding: 0.5rem;
}
.label {
  display: flex;
  align-items: center;
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
.disablelabel {
  &:hover {
    cursor: auto;
    opacity: 1;
  }
}
</style>
