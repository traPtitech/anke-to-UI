<template>
  <template v-if="questionnaire">
    <Informations :questionnaire="questionnaire"></Informations>
  </template>
  <template v-else> 読み込み中 </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import apis, { QuestionnaireByID } from '../lib/apis'
import Informations from '/@/components/Questionnaire/Informations.vue'

export default defineComponent({
  name: 'Questionnaire',
  components: { Informations },
  setup() {
    const questionnaire = ref<QuestionnaireByID | null>(null)
    onMounted(async () => {
      const { data } = await apis.getQuestionnaire(1)
      questionnaire.value = data
    })

    return { questionnaire }
  }
})
</script>
