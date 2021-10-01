<template>
  <div>
    <div>
      <Icon name="chevron-up" />
      <Icon name="chevron-down" />
      <Icon name="delete" />
    </div>
    <div>
      <div>
        <QuestionInput
          :model-value="name"
          @update:modelValue="updateQuestionName"
        />
        <QuestionCheckbox
          :contents="questionRequiredContent"
          :model-value="questionRequired"
          @update:modelValue="updateQuestionRequired"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import QuestionInput from '../../UI/QuestionInput.vue'
import QuestionCheckbox from '../../UI/QuestionCheckbox.vue'
import Icon from '../../UI/Icon.vue'

export interface QuestionDataBase {
  name: string
  required: boolean
  detail: any
}

const requiredLabel = '必須'

export default defineComponent({
  name: 'QuestionForm',
  components: {
    QuestionInput,
    QuestionCheckbox,
    Icon
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
    const updateQuestionName = (name: string) => {
      context.emit('update:name', name)
    }

    const questionRequiredContent = computed(() => [requiredLabel])
    const questionRequired = computed(() =>
      props.isRequired ? [requiredLabel] : []
    )

    const updateQuestionRequired = (checked: string[]) => {
      context.emit(
        'update:required',
        checked.length > 0 && checked[0] == requiredLabel
      )
    }

    return {
      requiredLabel,
      questionRequiredContent,
      questionRequired,
      updateQuestionName,
      updateQuestionRequired
    }
  }
})
</script>
