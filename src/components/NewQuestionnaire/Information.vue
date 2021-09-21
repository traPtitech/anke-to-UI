<template>
  <QuestionnaireCard
    v-model:title="title"
    v-model:description="description"
    v-model:date="date"
  />
  <div :class="$style.row">
    <InformationCard :class="$style.information" />
    <OperationCard :class="$style.operation" />
  </div>
  <SubmitButton />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import QuestionnaireCard from './QuestionnaireCard.vue'
import InformationCard from './InformationCard.vue'
import OperationCard from './OperationCard.vue'
import SubmitButton from './SubmitButton.vue'

export default defineComponent({
  name: 'Information',
  components: {
    QuestionnaireCard,
    InformationCard,
    OperationCard,
    SubmitButton
  },
  setup() {
    const title = ref('')
    const description = ref('')
    const date = ref(new Date())

    return { title, description, date }
  }
})
</script>

<style lang="scss" module>
.row {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem 0;
  .information {
    width: 50%;
  }
  .operation {
    width: 50%;
    margin-left: 1rem;
  }
}
</style>
