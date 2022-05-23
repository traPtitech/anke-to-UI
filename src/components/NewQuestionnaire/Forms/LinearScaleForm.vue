<template>
  <QuestionForm
    :name="questionData.body"
    :is-required="questionData.is_required"
    @update:name="updateQuestionBody"
    @update:required="updateQuestionRequired"
  >
    <div>
      <Select v-model="rangeMin" :contents="['0', '1']" />
      to
      <Select
        v-model="rangeMax"
        :contents="['2', '3', '4', '5', '6', '7', '8', '9', '10']"
      />
    </div>
    <div>
      <div>
        {{ questionData.scale_min }}
        <QuestionInput v-model="labelMin" :is-number="false" />
      </div>
      <div>
        {{ questionData.scale_max }}
        <QuestionInput v-model="labelMax" :is-number="false" />
      </div>
    </div>
  </QuestionForm>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
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

    const rangeMin = ref(props.questionData.scale_min + '')
    const rangeMax = ref(props.questionData.scale_max + '')
    const labelMin = ref(props.questionData.scale_label_left)
    const labelMax = ref(props.questionData.scale_label_right)

    watch(rangeMin, rangeMinValue =>
      updateLinearScaleQuestionData('scale_min', Number(rangeMinValue))
    )

    watch(rangeMax, rangeMaxValue =>
      updateLinearScaleQuestionData('scale_max', Number(rangeMaxValue))
    )

    watch(labelMin, labelMinValue =>
      updateLinearScaleQuestionData('scale_label_left', labelMinValue)
    )

    watch(labelMax, labelMaxValue =>
      updateLinearScaleQuestionData('scale_label_right', labelMaxValue)
    )

    return {
      rangeMin,
      rangeMax,
      labelMin,
      labelMax,
      updateQuestionBody,
      updateQuestionRequired
    }
  }
})
</script>
