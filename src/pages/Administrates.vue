<template>
  <div :class="$style.card">
    <CardWithHeader>
      <template #header>自分が管理者になっているアンケート</template>
      <template #content>
        <transition name="fadeAdministrates">
          <div v-if="isFetched">
            <CardContentDetail :questionnaires="questionnaires" />
          </div>
          <div v-else>
            <CardContentDetailMock />
          </div>
        </transition>
      </template>
    </CardWithHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useTitle } from './use/title'
import CardWithHeader from '/@/components/UI/CardWithHeader.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import CardContentDetailMock from '/@/components/UI/CardContentDetailMock.vue'
import apis, { QuestionnaireMyAdministrates } from '/@/lib/apis'

export default defineComponent({
  name: 'Administrates',
  components: {
    CardWithHeader,
    CardContentDetail,
    CardContentDetailMock
  },
  setup() {
    useTitle(ref('回答対象のアンケート一覧'))

    const questionnaires = ref<QuestionnaireMyAdministrates[]>([])
    const isFetched = ref(false)
    onMounted(async () => {
      const { data } = await apis.getMyQuestionnaire()
      questionnaires.value = data
      isFetched.value = true
    })
    return { questionnaires, isFetched }
  }
})
</script>

<style lang="scss" module>
.card {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}
:global {
  .fadeAdministrates-enter-active,
  .fadeAdministrates-leave-active {
    transition: opacity 0.2s;
  }
  .fadeAdministrates-enter-from,
  .fadeAdministrates-leave-to {
    opacity: 0;
  }
}
</style>
