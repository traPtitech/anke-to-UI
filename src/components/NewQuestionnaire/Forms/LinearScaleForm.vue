<template>
  <QuestionForm
    :name="questionData.title"
    :is-required="questionData.isRequired"
    @update:name="updateQuestionBody"
    @update:required="updateQuestionRequired"
  >
    <div>
      <Select
        :model-value="rangeMin"
        :contents="['0', '1']"
        @update:model-value="
          modelValue => updateLinearScale('scaleMin', Number(modelValue))
        "
      />
      to
      <Select
        :model-value="rangeMax"
        :contents="['2', '3', '4', '5', '6', '7', '8', '9', '10']"
        @update:model-value="
          modelValue => updateLinearScale('scaleMax', Number(modelValue))
        "
      />
    </div>
    <div>
      <div>
        {{ questionData.scaleMin }}
        <InputText
          :model-value="labelLeft"
          :is-number="false"
          :placeholder="'ラベル(任意)'"
          @update:model-value="
            modelValue => updateLinearScale('scaleLabelLeft', modelValue)
          "
        />
      </div>
      <div>
        {{ questionData.scaleMax }}
        <InputText
          :model-value="labelRight"
          :is-number="false"
          :placeholder="'ラベル(任意)'"
          @update:model-value="
            modelValue => updateLinearScale('scaleLabelRight', modelValue)
          "
        />
      </div>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import QuestionForm from './QuestionForm.vue'
import Select from '../../UI/Select.vue'
import InputText from '../../UI/InputText.vue'
import { NewLinearScaleQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    Select,
    InputText
  },
  props: {
    questionData: {
      type: Object as PropType<NewLinearScaleQuestion>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: NewLinearScaleQuestion) => true
  },
  setup(props, context) {
    const updateNewLinearScaleQuestionData =
      updateQuestionData<NewLinearScaleQuestion>(props, context)
    const updateQuestionBody = (body: string) => {
      updateNewLinearScaleQuestionData('title', body)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateNewLinearScaleQuestionData('isRequired', required)
    }

    const rangeMin = computed(() => String(props.questionData.scaleMin))
    const rangeMax = computed(() => String(props.questionData.scaleMax))
    const labelLeft = computed(() => props.questionData.scaleLabelLeft)
    const labelRight = computed(() => props.questionData.scaleLabelRight)

    const updateLinearScale = (
      type: 'scaleMin' | 'scaleMax' | 'scaleLabelLeft' | 'scaleLabelRight',
      value: string | number
    ) => {
      updateNewLinearScaleQuestionData(type, value)
    }

    return {
      rangeMin,
      rangeMax,
      labelLeft,
      labelRight,
      updateQuestionBody,
      updateQuestionRequired,
      updateLinearScale
    }
  }
})
</script>
