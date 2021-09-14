<template>
  <div>
    <Header :questionnaire="questionnaire"></Header>
  </div>
  <div>
    <Information :information="questionnaire"></Information>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID } from 'src/lib/apis'
import Header from '/@/components/Questionnaire/Information/Header.vue'
import Information from '/@/components/Questionnaire/Information/Information.vue'

export default defineComponent({
  name: 'Informations',
  components: { Header, Information },
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
