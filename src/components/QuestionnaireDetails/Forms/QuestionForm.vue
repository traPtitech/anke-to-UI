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
          :contents="[requiredLabel]"
          :model-value="required ? [requiredLabel] : []"
          @update:modelValue="updateQuestionRequired"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    required: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const updateQuestionName = (name: string) => {
      context.emit('update:name', name)
    }

    const updateQuestionRequired = (checked: string[]) => {
      console.log(checked);
      context.emit(
        'update:required',
        checked.length > 0 && checked[0] == requiredLabel
      )
    }

    return {
      requiredLabel,
      updateQuestionName,
      updateQuestionRequired
    }
  }
})
</script>
