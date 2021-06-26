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
import { defineComponent, PropType } from 'vue'
import { TableFormStyle } from '../use/utils'

export default defineComponent({
  name: 'Tab',
  props: {
    tableForm: {
      type: String as PropType<TableFormStyle>,
      reqiured: true,
      default: 'view'
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
