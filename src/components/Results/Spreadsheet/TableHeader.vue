<template>
  <thead>
    <tr>
      <th v-for="(headerName, headerKey) in tableHeaders" :key="headerKey">
        <HeaderElem
          :header-name="headerName"
          :is-show-column="showColumns[headerKey]"
          @toggleShowColumn="() => toggleShowColumn(headerKey)"
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
    showColumns: {
      type: Array as PropType<boolean[]>,
      default: []
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleShowColumn: (headerKey: number) => true
  },
  setup(_, context) {
    const toggleShowColumn = (headerKey: number) => {
      context.emit('toggleShowColumn', headerKey)
    }
    return { toggleShowColumn }
  }
})
</script>
