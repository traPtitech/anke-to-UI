<template>
  <div :class="$style.questiontitle">
    <InputText
      :class="$style.title"
      :model-value="questionName"
      :placeholder="'質問文'"
      @update:model-value="updateQuestionName"
    />
    <required-switch
      :is-checked="isRequired"
      @update:checked="updateQuestionIsRequired()"
    />
  </div>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import InputText from '/@/components/UI/InputText.vue'
import RequiredSwitch from './RequiredSwitch.vue'

export default defineComponent({
  name: 'QuestionForm',
  components: {
    InputText,
    RequiredSwitch
  },
  props: {
    name: {
      type: String,
      required: true
    },
    isRequired: {
      type: Boolean,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:name': (v: string) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:required': (v: boolean) => true
  },
  setup(props, context) {
    const questionName = computed(() => props.name)
    const questionIsRequired = computed(() => props.isRequired)

    const updateQuestionName = (newName: string) => {
      context.emit('update:name', newName)
    }
    const updateQuestionIsRequired = () => {
      context.emit('update:required', !questionIsRequired.value)
    }

    return {
      questionName,
      updateQuestionName,
      updateQuestionIsRequired
    }
  }
})
</script>

<style lang="scss" module>
.questiontitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
}
.title {
  flex-grow: 1;
}
</style>
