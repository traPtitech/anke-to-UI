<template>
  <div>
    <ul>
      <li v-for="tab in tableFormTabs" :key="tab">
        <a @click="changeTableForm(tab)">{{ tab }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tableFormTabs, tableForm } from '../use/utils'

export default defineComponent({
  name: 'Tab',
  props: {
    tableForm: {
      type: String as PropType<TableFormStyle>,
      reqiured: true
    },
    tableFormTabs: {
      type: Array as PropType<TableFormStyle[]>,
      required: true
    },
    changeTableForm: {
      type: Function,
      required: true
    }
  }
})
</script>
