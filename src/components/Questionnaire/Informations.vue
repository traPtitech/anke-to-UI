<template>
  <div>
    <Header :questionnaire="questionnaire"></Header>
  </div>
  <div>
    <Information :information="questionnaire"></Information>
  </div>
  <div><Manipulation :questionnaire="questionnaire"></Manipulation></div>
  <div><Myanswer :myresponses="myresponses"></Myanswer></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID, ResponseSummary } from 'src/lib/apis'
import Header from '/@/components/Questionnaire/Information/Header.vue'
import Information from '/@/components/Questionnaire/Information/Information.vue'
import Manipulation from '/@/components/Questionnaire/Information/Manipulation.vue'
import Myanswer from './Information/Myanswer.vue'

export default defineComponent({
  name: 'Informations',
  components: { Header, Information, Manipulation, Myanswer },
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
