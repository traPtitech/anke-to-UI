<template>
  <template v-if="(questionnaire, myresponse)">
    <Informations
      :questionnaire="questionnaire"
      :myresponse="myresponse"
    ></Informations>
  </template>
  <template v-else> 読み込み中</template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import apis, { QuestionnaireByID, ResponseSummary } from '../lib/apis'
import Informations from '/@/components/Questionnaire/Informations.vue'

export default defineComponent({
  name: 'Questionnaire',
  components: { Informations },
  setup() {
    const questionnaire = ref<QuestionnaireByID | null>(null)
    const myresponse = ref<ResponseSummary[]>([])
    onMounted(async () => {
      const [qdetail, myrdetail] = await Promise.all([
        apis.getQuestionnaire(1),
        apis.getMyResponses(1)
      ])
      questionnaire.value = qdetail
      myresponse.value = myrdetail
    })

    return { questionnaire, myresponse }
  }
})
</script>
