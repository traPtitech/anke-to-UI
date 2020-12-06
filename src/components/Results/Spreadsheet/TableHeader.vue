<template>
  <thead>
    <tr>
      <th v-for="(header, k) in tableHeaders" :key="k" class="active-header">
        <HeaderElem :k="k" :header="header" />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import HeaderElem from '/@/components/Results/Spreadsheet/HeaderElem.vue'

export default defineComponent({
  name: 'TableHeader',
  components: {
    HeaderElem
  },
  props: {
    tableHeaders: {
      type: Array as PropType<string[]>,
      required: true
    },
    showColumn: {
      type: Array as PropType<boolean[]>,
      required: true
    }
  }
})
</script>
