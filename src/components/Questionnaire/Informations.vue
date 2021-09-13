<template>
  <template v-if="questionnaire">
    <Header :questionnaire="questionnaire"></Header>
    <Information></Information>
  </template>
  <template v-else>
    <div>読み込み中</div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import apis, { QuestionnaireByID } from '../lib/apis'
import Header from '/@/components/Questionnaire/Information/Header.vue'
import Information from '/@/components/Questionnaire/Information/Information.vue'

export default defineComponent({
  name: 'Questionnaire',
  components: { Header, Information },
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