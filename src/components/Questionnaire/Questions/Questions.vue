<template>
  <Card :class="$style.card">
    <template #header>{{ questionnaire.title }}</template>
  </Card>
  <Card :class="$style.cardquestion">
    <template #header>aaaaaaaaaaa</template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import { QuestionnaireMyTargeted } from '/@/lib/apis'

export default defineComponent({
  name: 'Questions',
  components: { Card },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireMyTargeted>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1.5px #d9d9d9;
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
  padding: 1rem;
}
.cardquestion {
  border-collapse: collapse;
  text-align: left;
  font-size: 1.25rem;
}
</style>
