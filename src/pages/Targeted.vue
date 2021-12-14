<template>
  <Card>
    <template #header>回答対象になっているアンケート</template>
    <template #content>
      <div :class="$style.frame">
        <CardContentDetail :questionnaires="questionnaires" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import Card from '/@/components/UI/Card.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import apis, { QuestionnaireMyTargeted } from '/@/lib/apis'

export default defineComponent({
  name: 'Targeted',
  components: {
    Card,
    CardContentDetail
  },
  setup() {
    useTitle(ref('回答対象のアンケート一覧'))

    const questionnaires = ref<QuestionnaireMyTargeted[]>([])
    onMounted(async () => {
      const { data } = await apis.getTargetedQuestionnaire('')
      questionnaires.value = data
    })
    return { questionnaires }
  }
})
</script>

<style lang="scss" module>
.frame {
  margin-top: -1px;
  padding: 0 0.5rem;
}
</style>
