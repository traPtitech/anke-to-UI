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
        <QuestionInput
          v-if="questioncontent.question_type === 'Number'"
          :is-number="true"
          :disabled="true"
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

        <QuestionInput
          v-if="questioncontent.question_type === 'Text'"
          :is-number="false"
          :disabled="true"
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
          :range="
            createRange(questioncontent.scale_max, questioncontent.scale_min)
          "
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
import LinearScale from '/@/components/UI/LinearScale.vue'
import QuestionCheckbox from '/@/components/UI/QuestionCheckbox.vue'
import QuestionInput from '/@/components/UI/QuestionInput.vue'
import QuestionRadio from '/@/components/UI/QuestionRadio.vue'
import QuestionTextarea from '/@/components/UI/QuestionTextarea.vue'
import { QuestionnaireMyTargeted, QuestionDetails } from '/@/lib/apis'

export default defineComponent({
  name: 'Questions',
  components: {
    Card,
    LinearScale,
    QuestionCheckbox,
    QuestionInput,
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
  setup() {
    const createRange = (max: number, min: number) => {
      const range = []
      for (let i = min; i <= max; i++) {
        range.push(i)
      }
      return range
    }
    return { createRange }
  }
})
</script>
