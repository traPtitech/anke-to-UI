<template>
  <Card :class="$style.card">
    <template #header>{{ questionnaire.title }}</template>
  </Card>
  <Card :class="$style.cardquestion">
    <template #header>
      <div v-for="(questioncontent, index) in questioncontents" :key="index">
        <div>
          <p>{{ questioncontent.body }}</p>
          <span
            ><IsRequired :required="questioncontent.is_required"></IsRequired
          ></span>
        </div>
        <div v-if="questioncontent.question_type == 'Number'">
          <ReadonlyNumber></ReadonlyNumber>
        </div>
        <div v-if="questioncontent.question_type == 'MultipleChoice'">
          <ReadonlyRadio :contents="questioncontent.options"></ReadonlyRadio>
        </div>
        <div v-if="questioncontent.question_type == 'TextArea'">
          <ReadonlyTextarea></ReadonlyTextarea>
        </div>
        <div v-if="questioncontent.question_type == 'Text'">
          <ReadonlyTextarea></ReadonlyTextarea>
        </div>
        <div v-if="questioncontent.question_type == 'Checkbox'">
          <ReadonlyCheckbox
            :contents="questioncontent.options"
          ></ReadonlyCheckbox>
        </div>
        <div v-if="questioncontent.question_type == 'LinearScale'">
          <ReadonlyLinearScale
            :contentsleft="questioncontent.scale_label_left"
            :contentsright="questioncontent.scale_label_right"
            :contentsmax="questioncontent.scale_max"
            :contentsmin="questioncontent.scale_min"></ReadonlyLinearScale>
        </div>
        <hr />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import ReadonlyTextarea from './ReadonlyTextarea.vue'
import ReadonlyCheckbox from './ReadonlyCheckbox.vue'
import ReadonlyRadio from './ReadonlyRadio.vue'
import ReadonlyNumber from './ReadonlyNumber.vue'
import IsRequired from './Is_required.vue'
import ReadonlyLinearScale from './ReadonlyLinearScale.vue'
import { QuestionnaireMyTargeted, QuestionDetails } from '/@/lib/apis'

export default defineComponent({
  name: 'Questions',
  components: {
    Card,
    ReadonlyTextarea,
    ReadonlyCheckbox,
    ReadonlyRadio,
    ReadonlyNumber,
    ReadonlyLinearScale,
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

<style lang="scss" module>
.card {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  padding: 1rem;
}
.cardquestion {
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
}
</style>
