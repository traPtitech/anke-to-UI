<template>
  <template v-if="questionnaire">
    <QuestionnaireTab
      :questionnaire="questionnaire"
      :myresponses="myresponses"
      :questioncontents="questioncontents"
    ></QuestionnaireTab>
  </template>
  <template v-else> 読み込み中</template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '../pages/use/title'
import apis, {
  QuestionDetails,
  QuestionnaireByID,
  ResponseSummary
} from '../lib/apis'
import QuestionnaireTab from '/@/components/Questionnaire/QuestionnaireTab.vue'

export default defineComponent({
  name: 'Questionnaire',
  components: { QuestionnaireTab },
  setup() {
    const route = useRoute()
    const questionnaire = ref<QuestionnaireByID | null>(null)
    const myresponses = ref<ResponseSummary[]>([])
    const questioncontents = ref<QuestionDetails[]>([])

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      if (isNaN(questionnaireId)) return
      const [qdata, myrdata, qdatas] = await Promise.all([
        apis.getQuestionnaire(questionnaireId, ''),
        apis.getMyResponses(questionnaireId),
        apis.getQuestions(questionnaireId, '')
      ])

      questionnaire.value = qdata.data
      myresponses.value = myrdata.data
      questioncontents.value = qdatas.data
      useTitle(ref(`${questionnaire.value?.title}`))
    })

    return { questionnaire, myresponses, questioncontents }
  }
})
</script>
