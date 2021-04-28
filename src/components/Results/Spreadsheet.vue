<template>
  <Tab />
  <ScrollView />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { QuestionnaireByID } from '/@/lib/apis'
import Tab from './Spreadsheet/Tab.vue'
import ScrollView from './Spreadsheet/ScrollView.vue'

export default defineComponent({
  name: 'Spreadsheet',
  components: {
    Tab,
    ScrollView
  },
  props: {
    questionnaire: {
      type: Object as PropType<QuestionnaireByID>,
      required: true
    }
  }
})
</script>
