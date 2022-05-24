<template>
  <Card :class="$style.card">
    <template #header>回答対象になっているアンケート</template>
    <template #content>
      <transition name="fadeTargeted">
        <div v-if="isFetched">
          <CardContentDetail :questionnaires="questionnaires" />
        </div>
        <div v-else>
          <CardContentDetailMock />
        </div>
      </transition>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import Card from '/@/components/UI/Card.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import CardContentDetailMock from '/@/components/UI/CardContentDetailMock.vue'
import apis, { QuestionnaireMyTargeted } from '/@/lib/apis'

export default defineComponent({
  name: 'Targeted',
  components: {
    Card,
    CardContentDetail,
    CardContentDetailMock
  },
  setup() {
    useTitle(ref('回答対象のアンケート一覧'))

    const questionnaires = ref<QuestionnaireMyTargeted[]>([])
    const isFetched = ref(false)
    onMounted(async () => {
      const { data } = await apis.getTargetedQuestionnaire()
      questionnaires.value = data
      isFetched.value = true
    })
    return { questionnaires, isFetched }
  }
})
</script>

<style lang="scss" module>
.card {
  max-width: 1280px;
}
:global {
  .fadeTargeted-enter-active,
  .fadeTargeted-leave-active {
    transition: opacity 0.2s;
  }
  .fadeTargeted-enter-from,
  .fadeTargeted-leave-to {
    opacity: 0;
  }
}
</style>
