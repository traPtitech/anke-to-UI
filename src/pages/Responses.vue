<template>
  <div :class="$style.card">
    <CardWithHeader>
      <template #header>自分の回答</template>
      <template #content>
        <FadeTransition>
          <div v-if="isFetched">
            <CardContentDetail :questionnaires="responseSummaries" />
          </div>
          <div v-else>
            <CardContentDetailMock />
          </div>
        </FadeTransition>
      </template>
    </CardWithHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import CardWithHeader from '/@/components/UI/CardWithHeader.vue'
import apis, { ResponseSummary } from '/@/lib/apis'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import CardContentDetailMock from '/@/components/UI/CardContentDetailMock.vue'
import FadeTransition from '/@/components/UI/FadeTransition.vue'

export default defineComponent({
  name: 'Responses',
  components: {
    CardWithHeader,
    CardContentDetail,
    CardContentDetailMock,
    FadeTransition
  },
  setup() {
    const responseSummaries = ref<ResponseSummary[]>([])
    const isFetched = ref(false)
    onMounted(async () => {
      const { data } = await apis.getMyResponses()
      responseSummaries.value = data
      isFetched.value = true
    })
    return {
      responseSummaries,
      isFetched
    }
  }
})
</script>

<style lang="scss" module>
.card {
  max-width: 720px;
  margin-right: auto;
  margin-left: auto;
}
</style>
