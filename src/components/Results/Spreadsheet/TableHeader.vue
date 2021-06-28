<template>
  <thead>
    <tr>
      <th v-for="(headerName, headerKey) in tableHeaders" :key="headerKey">
        <HeaderElem
          :header-key="headerKey"
          :header-name="headerName"
          :toggle-show-column="toggleShowColumn"
          :is-show-column="showColumns[headerKey]"
        />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import HeaderElem from './HeaderElem.vue'
export default defineComponent({
  name: 'TableHeader',
  components: {
    HeaderElem
  },
  props: {
    tableHeaders: {
      type: Array as PropType<string[]>,
      default: []
    },
    toggleShowColumn: {
      type: Function,
      required: true
    },
    showColumns: {
      type: Array as PropType<boolean[]>,
      default: []
    }
  },
  setup() {
    return {}
  }
})
</script>
