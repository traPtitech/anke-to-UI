<template>
  <div>
    <div :class="$style.questiontitle">
      <InputText
        :class="$style.title"
        :model-value="questionName"
        :placeholder="'質問のタイトルを入力'"
        :is-focus="true"
        @update:model-value="updateQuestionName"
      />
      <required-switch
        :is-checked="isRequired"
        @update:checked="updateQuestionIsRequired"
      />
    </div>
    <slot></slot>
  </div>
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

    const updateQuestionName = (newName: string) => {
      context.emit('update:name', newName)
    }
    const updateQuestionIsRequired = (isRequired: boolean) => {
      context.emit('update:required', isRequired)
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
