<template>
  <template v-if="questionnaire">
    <NewResponsesTab
      :questionnaire="questionnaire"
      :questioncontents="questioncontents"
    />
  </template>
  <template v-else> 読み込み中</template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '/@/pages/use/title'
import apis, { QuestionDetails, QuestionnaireByID } from '/@/lib/apis'
import NewResponsesTab from '/@/components/NewResponses/NewResponsesTab.vue'

export default defineComponent({
  name: 'NewResponses',
  components: { NewResponsesTab },
  setup() {
    const route = useRoute()
    const questionnaire = ref<QuestionnaireByID | null>(null)
    const questioncontents = ref<QuestionDetails[]>([])

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

    return {
      questionnaire,
      questioncontents
    }
  }
})
</script>

<style lang="scss" module>
.container {
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.right {
  align-items: flex-start;
  gap: 8px;
}
.title {
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: $ui-primary;
}
.description {
  @include size-body;
}
</style>
