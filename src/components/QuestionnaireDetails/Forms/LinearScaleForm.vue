<template>
  <QuestionForm
    :name="questionData.name"
    :is-required="questionData.required"
    @update:name="updateQuestionName"
    @update:required="updateQuestionRequired"
  >
    <div>
      <Select
        :contents="['0', '1']"
        :model-value="questionData.range[0] + ''"
        @update:modelValue="updateRangeMin"
      />
      to
      <Select
        :contents="['2', '3', '4', '5', '6', '7', '8', '9', '10']"
        :model-value="questionData.range[1] + ''"
        @update:modelValue="updateRangeMax"
      />
    </div>
    <div>
      <div>
        {{ questionData.range[0] }}
        <QuestionInput
          :is-number="false"
          :model-value="''"
          @update:modelValue="updateLabelMin"
        />
      </div>
      <div>
        {{ questionData.range[1] }}
        <QuestionInput
          :is-number="false"
          :model-value="''"
          @update:modelValue="updateLabelMax"
        />
      </div>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionForm from './QuestionForm.vue'
import Select from '../../UI/Select.vue'
import QuestionInput from '../../UI/QuestionInput.vue'

interface CheckboxQuestion {
  name: string
  required: boolean
  range: [min: number, max: number]
  leftLabel: string
  rightLabel: string
  contents: string[]
}

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    QuestionInput,
    Select
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
    const updateQuestionName = (name: string) => {
      const newData = { ...props.questionData, name }
      context.emit('update', newData, props.index)
    }
    const updateQuestionRequired = (required: boolean) => {
      const newData = { ...props.questionData, required }
      context.emit('update', newData, props.index)
    }

    const updateRangeMin = (value: string) => {
      const newData: CheckboxQuestion = {
        ...props.questionData,
        range: [Number(value), props.questionData.range[1]]
      }
      context.emit('update', newData, props.index)
    }

    const updateRangeMax = (value: string) => {
      const newData: CheckboxQuestion = {
        ...props.questionData,
        range: [props.questionData.range[0], Number(value)]
      }
      context.emit('update', newData, props.index)
    }

    const updateLabelMin = (leftLabel: string) => {
      const newData: CheckboxQuestion = {
        ...props.questionData,
        leftLabel
      }
      context.emit('update', newData, props.index)
    }

    const updateLabelMax = (rightLabel: string) => {
      const newData: CheckboxQuestion = {
        ...props.questionData,
        rightLabel
      }
      context.emit('update', newData, props.index)
    }

    return {
      updateQuestionName,
      updateQuestionRequired,
      updateRangeMin,
      updateRangeMax,
      updateLabelMin,
      updateLabelMax
    }
  }
})
</script>
