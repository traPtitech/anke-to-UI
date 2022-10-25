<template>
  <template v-if="questionnaire">
    <Informations :questionnaire="questionnaire" :my-responses="myresponses" />
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
import Informations from '/@/components/Questionnaire/Informations.vue'

export default defineComponent({
  name: 'Questionnaire',
  components: { Informations },
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
        apis.getMyResponsesByID(questionnaireId),
        apis.getQuestions(questionnaireId, '')
      ])

      questionnaire.value = qdata.data
      myresponses.value = myrdata.data
      questioncontents.value = qdatas.data
      useTitle(ref(`${qdata.data.title}`))
    })

    return {
      questionnaire,
      myresponses,
      questioncontents
    }
  }
})
</script>
