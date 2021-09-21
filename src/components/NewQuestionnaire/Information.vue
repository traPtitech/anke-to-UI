<template>
  <Card :class="$style.card">
    <template #header>
      <InformationInput v-model="title" />
    </template>
    <template #content>
      <InformationTextarea v-model="description" />
      <TimeLimit v-model="date" />
    </template>
  </Card>
  <div :class="$style.row">
    <InformationCard :class="$style.information" />
    <OperationCard :class="$style.operation" />
  </div>
  <SubmitButton />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Card from '/@/components/UI/Card.vue'
import InformationInput from './InformationInput.vue'
import InformationTextarea from './InformationTextarea.vue'
import TimeLimit from './TimeLimit.vue'
import InformationCard from './InformationCard.vue'
import OperationCard from './OperationCard.vue'
import SubmitButton from './SubmitButton.vue'

export default defineComponent({
  name: 'Information',
  components: {
    Card,
    InformationInput,
    InformationTextarea,
    TimeLimit,
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
.card {
  border: solid 1px #e0d1c5;
  box-shadow: 0 0.25rem 0.5rem #00000030;
}
.row {
  display: flex;
  justify-content: start;
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
