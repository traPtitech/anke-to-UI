<template>
  <template v-if="questionnaire">
    <div :class="$style.container">
      <NewResponsesTab
        :class="$style.tab"
        :questionnaire="questionnaire"
        :questioncontents="questioncontents"
        @update:responsebody="value => (responseBody = value)"
      />
    </div>
    <KeepAnswerButton
      :keeptxt="'保存'"
      :answertxt="'回答'"
      :class="$style.button"
      @keep="keepNewResponses"
      @answer="answerNewResponses"
    />
  </template>
  <template v-else> 読み込み中</template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '/@/pages/use/title'
import apis, {
  PostResponse,
  QuestionDetails,
  QuestionnaireByID,
  ResponseBody
} from '/@/lib/apis'
import NewResponsesTab from '/@/components/NewResponses/NewResponsesTab.vue'
import KeepAnswerButton from '/@/components/UI/KeepAnswerButton.vue'

export default defineComponent({
  name: 'NewResponses',
  components: { NewResponsesTab, KeepAnswerButton },
  setup() {
    const route = useRoute()
    const questionnaire = ref<QuestionnaireByID | null>(null)
    const questioncontents = ref<QuestionDetails[]>([])
    const responseBody = ref<ResponseBody[]>([])

    onMounted(async () => {
      const questionnaireId = Number(route.params.id)
      if (isNaN(questionnaireId)) return
      const [qdata, qdatas] = await Promise.all([
        apis.getQuestionnaire(questionnaireId, ''),
        apis.getQuestions(questionnaireId, '')
      ])

      questionnaire.value = qdata.data
      questioncontents.value = qdatas.data
      useTitle(ref(`${qdata.data.title}`))
    })

    const keepNewResponses = () => {
      const responses = makeResponses(true)
      apis.postResponse(responses)
    }
    const answerNewResponses = () => {
      const responses = makeResponses(false)
      apis.postResponse(responses)
    }
    const makeResponses = (tmp: boolean): PostResponse => {
      const date = new Date()
      return {
        questionnaireID: Number(questionnaire.value?.questionnaireID),
        body: responseBody.value,
        temporarily: tmp,
        submitted_at: date.toISOString()
      }
    }

    return {
      questionnaire,
      questioncontents,
      responseBody,
      keepNewResponses,
      answerNewResponses
    }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 720px;
  margin-right: auto;
  margin-left: auto;
}
.button {
  position: fixed;
  right: 5rem;
  bottom: 3rem;
}
</style>
