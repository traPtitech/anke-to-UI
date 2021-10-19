<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <div v-for="(label, i) in questionData.options" :key="i">
        <ChoiceElement
          :label="label"
          :index="i"
          :is-radio="isRadio"
          @update:label="updateChoice"
          @delete="deleteChoice"
        />
      </div>
    </div>
    <div>
      <span @click="addChoice">
        <Icon name="plus-circle-outline" />新しい選択肢を追加
      </span>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionForm from './QuestionForm.vue'
import ChoiceElement from './ChoiceElement.vue'
import Icon from '../../UI/Icon.vue'
import { CheckboxQuestion } from '../use/utils'
import { updateQuestionData } from '../use/computeData'

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    ChoiceElement,
    Icon
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    questionData: {
      type: Object as PropType<CheckboxQuestion>,
      required: true
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: CheckboxQuestion, index: number) => true
  },
  setup(props, context) {
    const updateChoiceQuestionData = updateQuestionData<CheckboxQuestion>(
      props,
      context
    )
    const updateQuestionName = (name: string) => {
      updateChoiceQuestionData('body', name)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateChoiceQuestionData('is_required', required)
    }

    const updateChoice = (label: string, index: number) => {
      const newOptions = [...props.questionData.options]
      newOptions[index] = label
      updateChoiceQuestionData('options', newOptions)
    }

    const deleteChoice = (label: string, index: number) => {
      const newOptions = [...props.questionData.options]
      newOptions.splice(index, 1)
      updateChoiceQuestionData('options', newOptions)
    }

    const addChoice = () => {
      const newOptions = [...props.questionData.options]
      newOptions.push('')
      updateChoiceQuestionData('options', newOptions)
    }

    return {
      updateQuestionName,
      updateQuestionRequired,
      updateChoice,
      deleteChoice,
      addChoice
    }
  }
})
</script>
