<template>
  <div :class="$style.card">
    <CardWithHeader>
      <template #header>自分が管理者になっているアンケート</template>
      <template #content>
        <CardContentDetail :questionnaires="questionnaires" />
      </template>
    </CardWithHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import CardWithHeader from '/@/components/UI/CardWithHeader.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import apis, { QuestionnaireMyAdministrates } from '/@/lib/apis'

export default defineComponent({
  name: 'Administrates',
  components: {
    CardWithHeader,
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
  max-width: 1280px;
}
</style>
