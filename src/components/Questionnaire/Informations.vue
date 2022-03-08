<template>
  <div>
    <Summary :questionnaire="questionnaire" />
  </div>
  <div>
    <Detail :information="questionnaire" />
  </div>
  <div><Manipulation :questionnaire="questionnaire" /></div>
  <div><MyAnswer :my-responses="myResponses" /></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseSummary } from 'src/lib/apis'
import Summary from './Information/Summary.vue'
import Detail from './Information/Detail.vue'
import Manipulation from '/@/components/Questionnaire/Information/Manipulation.vue'
import MyAnswer from './Information/MyAnswer.vue'

export default defineComponent({
  name: 'Informations',
  components: { Summary, Detail, Manipulation, MyAnswer },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    myResponses: {
      type: Array as PropType<ResponseSummary[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
