<template>
  <div>
    <div v-if="true">
      <ResultTab :questionnaire="questionnaire" />
    </div>
    <div v-if="/* information.administrators && !canViewResults */ false">
      <p>結果を閲覧する権限がありません</p>
    </div>
  </div>
</template>

<script lang="ts">
// import InformationSummary from '@/components/Information/InformationSummary'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ResultTab from '/@/components/Results/ResultTab.vue'
import apis, { QuestionnaireByID, ResponseResult } from '/@/lib/apis'

export default defineComponent({
  name: 'Results',
  components: {
    ResultTab
  },
  setup() {
    const route = useRoute()
    const questionnaire = ref<QuestionnaireByID>()
    const results = ref<ResponseResult[]>([])

    onMounted(async () => {
      const { data: qdata } = await apis.getQuestionnaire(
        Number(route.params.id),
        ''
      )
      const { data: rdata } = await apis.getResults(Number(route.params.id), '')
      questionnaire.value = qdata
      results.value = rdata
    })

    return {
      questionnaire,
      results
    }
  }
})
</script>
