<template>
  <Card :class="$style.card">
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
