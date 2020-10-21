<template>
  <Card>
    <template #header>回答対象になっているアンケート</template>
    <template #content>
      <CardContentDetail />
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Card from '/@/components/UI/Card.vue'
import CardContentDetail from '/@/components/UI/CardContentDetail.vue'
import apis, { QuestionnaireMyTargeted } from '/@/lib/apis'

export default defineComponent({
  name: 'List',
  components: {
    Card,
    CardContentDetail
  },
  setup() {
    const questionnaires = ref<QuestionnaireMyTargeted[]>([])
    onMounted(async () => {
      const { data } = await apis.getMyTargeted()
      questionnaires.value = data
    })
    return { questionnaires }
  }
})
</script>

<style lang="scss" module>
.container {
  width: 100%;
  max-width: fit-content;
  margin: 1em 0;
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  box-shadow: 0 2px 3px #dfe0d7;
}
.header {
  text-align: left;
  font-size: 15pt;
  margin: 8px 0;
}
</style>
