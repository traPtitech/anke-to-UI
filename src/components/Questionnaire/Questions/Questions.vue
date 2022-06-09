<template>
  <Card>
    <template #header>{{ questionnaire.title }}</template>
  </Card>
  <Card>
    <template #header>
      <div v-for="(questioncontent, index) in questioncontents" :key="index">
        <div>
          <p>{{ questioncontent.body }}</p>
          <span><IsRequired :required="questioncontent.is_required" /></span>
        </div>
        <InputText
          v-if="questioncontent.question_type === 'Number'"
          :is-number="true"
          :disabled="true"
          :placeholder="'数値を入力'"
        />

        <QuestionRadio
          v-if="questioncontent.question_type === 'MultipleChoice'"
          :contents="questioncontent.options"
          :disabled="true"
        />

        <QuestionTextarea
          v-if="questioncontent.question_type === 'TextArea'"
          :disabled="true"
        />

        <InputText
          v-if="questioncontent.question_type === 'Text'"
          :is-number="false"
          :disabled="true"
          :placeholder="'回答'"
        />

        <QuestionCheckbox
          v-if="questioncontent.question_type === 'Checkbox'"
          :contents="questioncontent.options"
          :disabled="true"
        />

        <LinearScale
          v-if="questioncontent.question_type === 'LinearScale'"
          :left-label="questioncontent.scale_label_left"
          :right-label="questioncontent.scale_label_right"
          :range="questionrange[questioncontent.questionID]"
          :disabled="true"
        />
        <hr />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import IsRequired from './IsRequired.vue'
import { questionrangedetail } from '/@/components/Questionnaire/usequestonnaire'
import LinearScale from '/@/components/UI/LinearScale.vue'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'
import InputText from '/@/components/UI/InputText.vue'
import QuestionRadio from '/@/components/UI/QuestionRadio.vue'
import QuestionTextarea from '/@/components/UI/QuestionTextarea.vue'
import { QuestionnaireMyTargeted, QuestionDetails } from '/@/lib/apis'

export default defineComponent({
  name: 'Questions',
  components: {
    Card,
    LinearScale,
    QuestionCheckbox,
    InputText,
    QuestionRadio,
    QuestionTextarea,
    IsRequired
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireMyTargeted>,
      required: true
    },
    questioncontents: {
      type: Array as PropType<QuestionDetails[]>,
      required: true
    }
  },
  setup(props) {
    const createRange = (max: number, min: number) => {
      const range = []
      for (let i = min; i <= max; i++) {
        range.push(i)
      }
      return range
    }
    const questionrange = props.questioncontents.reduce((acc, q) => {
      if (q.question_type === 'LinearScale')
        acc[q.questionID] = createRange(q.scale_max, q.scale_min)
      return acc
    }, {} as questionrangedetail)
    return { questionrange }
  }
})
</script>
