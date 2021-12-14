<template>
  <Card>
    <template #header>{{ questionnaire.title }}</template>
    <template #content>
      <div>
        {{ questionnaire.description }}
        <span>回答期限:{{ questionnaire.res_time_limit }}</span>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import { QuestionnaireMyTargeted } from '/@/lib/apis'

export default defineComponent({
  name: 'Summary',
  components: { Card },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireMyTargeted>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
