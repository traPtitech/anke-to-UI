<template>
  <div :class="$style.container">
    <label
      v-for="(content, index) in contents"
      :key="index"
      :class="$style.label"
    >
      <radio-button
        :is-selected="index === selectedIndex"
        @input="update(index)"
      />
      <p :class="$style.content">{{ content }}</p>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue'
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
    let selectedIndex = ref() as Ref<number>
    const update = (index: number) => {
      selectedIndex.value = index
      context.emit('update:modelValue', props.contents[index])
    }

    return { selectedIndex, update }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 0.5rem;
  .label {
    display: flex;
    align-items: center;
    margin: 0.4rem 0;
    .content {
      margin: 0;
      margin-left: 0.4rem;
    }
  }
}
</style>
