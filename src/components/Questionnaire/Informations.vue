<template>
  <div>
    <Summary :questionnaire="questionnaire"></Summary>
  </div>
  <div>
    <Detail :information="questionnaire"></Detail>
  </div>
  <div><Manipulation :questionnaire="questionnaire"></Manipulation></div>
  <div><Myanswer :myresponses="myresponses"></Myanswer></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseSummary } from 'src/lib/apis'
import Summary from './Information/Summary.vue'
import Detail from './Information/Detail.vue'
import Manipulation from '/@/components/Questionnaire/Information/Manipulation.vue'
import Myanswer from './Information/Myanswer.vue'

export default defineComponent({
  name: 'Informations',
  components: { Summary, Detail, Manipulation, Myanswer },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    },
    myresponses: {
      type: Array as PropType<ResponseSummary[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
