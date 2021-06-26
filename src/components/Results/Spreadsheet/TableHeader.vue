<template>
  <thead>
    <tr>
      <th v-for="(headerName, headerKey) in tableHeaders" :key="headerKey">
        <HeaderElem :header-key="headerKey" :header-name="headerName" :toggle-show-column="toggleShowColumn" :is-show-column="showColumns[headerKey]" />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderElem from './HeaderElem.vue'
export default defineComponent({
  name: 'TableHeader',
  components: {
    HeaderElem
  },
  props: {
    tableHeaders: {
      type: Object as PropType<string[]>,
      required: true
    },
    toggleShowColumn: {
      type: Function,
      required: true
    },
    showColumns: {
      type: Object as PropType<boolean[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
