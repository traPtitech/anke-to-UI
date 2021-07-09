<template>
  <div :class="$style.container">
    <label
      v-for="(content, index) in contents"
      :key="index"
      :class="$style.label"
    >
      <div :class="$style.button">
        <div
          :class="[
            index === selectedIndex ? $style.selected : '',
            $style.innerButton
          ]"
        />
      </div>
      <input
        type="radio"
        name="radio"
        :class="$style.input"
        @input="update(index)"
      />
      <p :class="$style.content">{{ content }}</p>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue'

export default defineComponent({
  name: 'QuestionRadio',
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
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  content: '';
  width: 1rem;
  height: 1rem;
  border: solid 1px #7c6c4d;
  border-radius: 50%;
  cursor: pointer;
  .innerButton {
    content: '';
    width: 75%;
    height: 75%;
    background-color: #7c6c4d;
    border-radius: 50%;
    transition: transform 0.1s;
    transform: scale(0);
  }
  .selected {
    transform: scale(1);
  }
  &:hover {
    opacity: 0.6;
  }
}
.input {
  appearance: none;
}
</style>
