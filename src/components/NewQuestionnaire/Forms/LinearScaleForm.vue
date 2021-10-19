<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionBody"
    @update:required="updateQuestionRequired"
  >
    <div>
      <Select
        :contents="['0', '1']"
        :model-value="rangeMin"
        @update:modelValue="updateRangeMin"
      />
      to
      <Select
        :contents="['2', '3', '4', '5', '6', '7', '8', '9', '10']"
        :model-value="rangeMax"
        @update:modelValue="updateRangeMax"
      />
    </div>
    <div>
      <div>
        {{ questionData.scale_min }}
        <QuestionInput
          :is-number="false"
          :model-value="''"
          @update:modelValue="updateLabelMin"
        />
      </div>
      <div>
        {{ questionData.scale_max }}
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
import { defineComponent, PropType, computed } from 'vue'
import QuestionForm from './QuestionForm.vue'
import Select from '../../UI/Select.vue'
import QuestionInput from '../../UI/QuestionInput.vue'
import { LinearScaleQuestion } from '../use/utils'
import { updateQuestionData } from '../use/computeData'

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
      type: Object as PropType<LinearScaleQuestion>,
      required: true
    },
    isRadio: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: LinearScaleQuestion, index: number) => true
  },
  setup(props, context) {
    const rangeMin = computed(() => props.questionData.scale_min + '')
    const rangeMax = computed(() => props.questionData.scale_max + '')
    const updateLinearScaleQuestionData =
      updateQuestionData<LinearScaleQuestion>(props, context)
    const updateQuestionBody = (body: string) => {
      updateLinearScaleQuestionData('body', body)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateLinearScaleQuestionData('is_required', required)
    }
    const updateRangeMin = (scale_min: string) => {
      updateLinearScaleQuestionData('scale_min', Number(scale_min))
    }
    const updateRangeMax = (scale_max: string) => {
      updateLinearScaleQuestionData('scale_max', Number(scale_max))
    }
    const updateLabelMin = (label_min: string) => {
      updateLinearScaleQuestionData('scale_label_left', label_min)
    }
    const updateLabelMax = (label_max: string) => {
      updateLinearScaleQuestionData('scale_label_right', label_max)
    }

    return {
      rangeMin,
      rangeMax,
      updateQuestionBody,
      updateQuestionRequired,
      updateRangeMin,
      updateRangeMax,
      updateLabelMin,
      updateLabelMax
    }
  }
})
</script>
