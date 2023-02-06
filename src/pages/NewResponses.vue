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
    <div v-if="isMobile" :class="$style.footer">
      <KeepAnswerButton
        :keeptxt="'保存'"
        :answertxt="'回答'"
        :class="$style.mobile_button"
        @keep="keepNewResponses"
        @answer="answerNewResponses"
      />
    </div>
    <KeepAnswerButton
      v-else
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
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '/@/pages/use/title'
import apis, {
  PostResponse,
  QuestionDetails,
  QuestionnaireByID,
  ResponseBody
} from '/@/lib/apis'
import NewResponsesTab from '/@/components/NewResponses/NewResponsesTab.vue'
import KeepAnswerButton from '/@/components/UI/KeepAnswerButton.vue'
import useIsMobile from '/@/use/isMobile'

export default defineComponent({
  name: 'NewResponses',
  components: { NewResponsesTab, KeepAnswerButton },
  setup() {
    const route = useRoute()
    const router = useRouter()
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

    const keepNewResponses = async () => {
      const responses = makeResponses(true)
      const post = await apis.postResponse(responses)
      router.push(`/responses/${post.data.responseID}`)
    }
    const answerNewResponses = async () => {
      const responses = makeResponses(false)
      const post = await apis.postResponse(responses)
      router.push(`/responses/${post.data.responseID}`)
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
    const { isMobile } = useIsMobile()

    return {
      questionnaire,
      questioncontents,
      responseBody,
      keepNewResponses,
      answerNewResponses,
      isMobile
    }
  }
})
</script>

<style lang="scss" module>
.container {
  max-width: 720px;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 3rem;
}
.button {
  position: fixed;
  right: 5rem;
  bottom: 3rem;
}
.mobile_button {
  margin-top: auto;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: $ui-white;
  width: 100%;
  box-shadow: 0px -20px 20px -20px rgba(0, 0, 0, 0.25);
  height: 3rem;
}
</style>
