<template>
  <div>
    <Header :questionnaire="questionnaire"></Header>
  </div>
  <div>
    <Information :information="questionnaire"></Information>
  </div>
  <div>
    <Manipulation :questionnaire="questionnaire"></Manipulation>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID } from 'src/lib/apis'
import Header from '/@/components/Questionnaire/Information/Header.vue'
import Information from '/@/components/Questionnaire/Information/Information.vue'
import Manipulation from '/@/components/Questionnaire/Information/Manipulation.vue'

export default defineComponent({
  name: 'Informations',
  components: { Header, Information, Manipulation },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
