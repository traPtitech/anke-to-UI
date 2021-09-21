<template>
  <Card :class="$style.card">
    <template #header>
      <InformationInput v-model="titleComputed" />
    </template>
    <template #content>
      <InformationTextarea v-model="descriptionComputed" />
      <TimeLimit v-model="dateComputed" />
    </template>
  </Card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import Card from '/@/components/UI/Card.vue'
import InformationInput from './InformationInput.vue'
import InformationTextarea from './InformationTextarea.vue'
import TimeLimit from './TimeLimit.vue'

export default defineComponent({
  name: 'QuestionnaireCard',
  components: {
    Card,
    InformationInput,
    InformationTextarea,
    TimeLimit
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Object as PropType<Date>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:title': (v: string) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:description': (v: string) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:date': (v: Date) => true
  },
  setup(props, context) {
    const titleComputed = computed({
      get: () => props.title,
      set: value => context.emit('update:title', value)
    })
    const descriptionComputed = computed({
      get: () => props.description,
      set: value => context.emit('update:description', value)
    })
    const dateComputed = computed({
      get: () => props.date,
      set: value => context.emit('update:date', value)
    })

    return { titleComputed, descriptionComputed, dateComputed }
  }
})
</script>

<style lang="scss" module>
.card {
  border: solid 1px #e0d1c5;
  box-shadow: 0 0.25rem 0.5rem #00000030;
}
</style>
