<template>
  <Card :class="$style.card">
    <template #header>自分が管理者になっているアンケート</template>
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
import apis, { QuestionnaireMyAdministrates } from '/@/lib/apis'

export default defineComponent({
  name: 'Administrates',
  components: {
    Card,
    CardContentDetail
  },
  setup() {
    useTitle(ref('回答対象のアンケート一覧'))

    const questionnaires = ref<QuestionnaireMyAdministrates[]>([])
    onMounted(async () => {
      const { data } = await apis.getMyQuestionnaire()
      questionnaires.value = data
    })
    return { questionnaires }
  }
})
</script>

<style lang="scss" module>
.card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}
.frame {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  margin-top: -1px;
  padding: 1rem 1.5rem;
}
</style>
