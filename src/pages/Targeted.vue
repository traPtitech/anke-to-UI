<template>
  <Card :class="$style.card">
    <template #header>回答対象になっているアンケート</template>
    <template #content>
      <div v-if="isFetched" :class="$style.frame">
        <CardContentDetail :questionnaires="questionnaires" />
      </div>
      <div v-else :class="$style.frame">
        <CardContentDetailMock />
      </div>
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
      const { data } = await apis.getMyTargeted()
      questionnaires.value = data
      isFetched.value = true
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
