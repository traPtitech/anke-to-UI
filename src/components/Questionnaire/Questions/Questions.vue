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
        <QuestionTextarea v-if="questioncontent.question_type === 'Number'" />

        <QuestionRadio
          v-if="questioncontent.question_type === 'MultipleChoice'"
          :contents="questioncontent.options"
        />

        <QuestionTextarea v-if="questioncontent.question_type === 'TextArea'" />

        <QuestionTextarea v-if="questioncontent.question_type === 'Text'" />

        <QuestionCheckbox
          v-if="questioncontent.question_type === 'Checkbox'"
          :contents="questioncontent.options"
        />

        <LinearScale
          v-if="questioncontent.question_type === 'LinearScale'"
          :left-label="questioncontent.scale_label_left"
          :right-label="questioncontent.scale_label_right"
          :range="[questioncontent.scale_min, questioncontent.scale_max]"
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
import QuestionRadio from '/@/components/UI/QuestionRadio.vue'
import QuestionTextarea from '/@/components/UI/QuestionTextarea.vue'
import { QuestionnaireMyTargeted, QuestionDetails } from '/@/lib/apis'

export default defineComponent({
  name: 'Questions',
  components: {
    Card,
    LinearScale,
    QuestionCheckbox,
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
    return {}
  }
})
</script>
