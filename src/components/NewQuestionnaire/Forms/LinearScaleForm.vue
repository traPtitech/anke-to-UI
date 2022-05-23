<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionBody"
    @update:required="updateQuestionRequired"
  >
    <div>
      <Select
        :model-value="RangeMin"
        :contents="['0', '1']"
        @update:model-value="
          modelValue => updateLinearScale('scale_min', Number(modelValue))
        "
      />
      to
      <Select
        :model-value="RangeMax"
        :contents="['2', '3', '4', '5', '6', '7', '8', '9', '10']"
        @update:model-value="
          modelValue => updateLinearScale('scale_max', Number(modelValue))
        "
      />
    </div>
    <div>
      <div>
        {{ questionData.scale_min }}
        <QuestionInput
          :model-value="LabelLeft"
          :is-number="false"
          @update:model-value="
            modelValue => updateLinearScale('scale_label_left', modelValue)
          "
        />
      </div>
      <div>
        {{ questionData.scale_max }}
        <QuestionInput
          :model-value="LabelRight"
          :is-number="false"
          @update:model-value="
            modelValue => updateLinearScale('scale_label_right', modelValue)
          "
        />
      </div>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import QuestionForm from './QuestionForm.vue'
import Select from '../../UI/Select.vue'
import QuestionInput from '../../UI/QuestionInput.vue'
import { LinearScaleQuestion } from '../use/utils'
import { updateQuestionData } from '../use/updateQuestionData'

export default defineComponent({
  name: 'ChoiceForm',
  components: {
    QuestionForm,
    Select,
    QuestionInput
  },
  props: {
    questionData: {
      type: Object as PropType<LinearScaleQuestion>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (question: LinearScaleQuestion) => true
  },
  setup(props, context) {
    const updateLinearScaleQuestionData =
      updateQuestionData<LinearScaleQuestion>(props, context)
    const updateQuestionBody = (body: string) => {
      updateLinearScaleQuestionData('body', body)
    }
    const updateQuestionRequired = (required: boolean) => {
      updateLinearScaleQuestionData('is_required', required)
    }

    const RangeMin = computed(() => String(props.questionData.scale_min))
    const RangeMax = computed(() => String(props.questionData.scale_max))
    const LabelLeft = computed(() => props.questionData.scale_label_left)
    const LabelRight = computed(() => props.questionData.scale_label_right)

    const updateLinearScale = (
      type:
        | 'scale_min'
        | 'scale_max'
        | 'scale_label_left'
        | 'scale_label_right',
      value: string | number
    ) => {
      updateLinearScaleQuestionData(type, value)
    }

    return {
      RangeMin,
      RangeMax,
      LabelLeft,
      LabelRight,
      updateQuestionBody,
      updateQuestionRequired,
      updateLinearScale
    }
  }
})
</script>
