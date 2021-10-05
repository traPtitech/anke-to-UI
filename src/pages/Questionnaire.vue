<template>
  <template v-if="questionnaire">
    <QuestionnaireTab
      :questionnaire="questionnaire"
      :myresponses="myresponses"
    ></QuestionnaireTab>
  </template>
  <template v-else> 読み込み中</template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import apis, { QuestionnaireByID, ResponseSummary } from '../lib/apis'
import QuestionnaireTab from '/@/components/Questionnaire/QuestionnaireTab.vue'

export default defineComponent({
  name: 'Questionnaire',
  components: { QuestionnaireTab },
  setup() {
    const route = useRoute()
    const questionnaire = ref<QuestionnaireByID | null>(null)
    const myresponses = ref<ResponseSummary[]>([])

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      if (isNaN(questionnaireId)) return
      const [qdata, myrdata] = await Promise.all([
        apis.getQuestionnaire(questionnaireId, ''),
        apis.getMyResponses(questionnaireId, '')
      ])

      questionnaire.value = qdata.data
      myresponses.value = myrdata.data
    })

    return { questionnaire, myresponses }
  }
})
</script>
