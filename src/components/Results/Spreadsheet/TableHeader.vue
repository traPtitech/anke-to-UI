<template>
  <thead>
    <tr>
      <th
        v-for="(header, k) in tableHeaders"
        :key="k"
        :class="{
          'active-header': isColumnActive(k),
          hidden: isColumnHidden(k)
        }"
      >
        <HeaderElem
          :k="k"
          :is-column-hidden="isColumnHidden"
          :header="header"
          :sorted="sorted"
          :sort="sort"
          @toggle-show-column="toggleShowColumn"
        />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue'
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
  },
  setup(props, context) {
    const state = reactive<{
      sorted: string | number
    }>({
      sorted: ''
    })

    const isColumnActive = (index: number): boolean =>
      state.sorted === Math.abs(index + 1)
    const isColumnHidden = (index: number): boolean =>
      props.showColumn.length === props.tableHeaders.length &&
      !props.showColumn[index]
    const toggleShowColumn = (index: number) =>
      context.emit('toggle-show-column', index)

    const sort = (index: number) => {
      let query = ''
      if (state.sorted !== index) {
        query += '-'
        state.sorted = index
      } else {
        state.sorted = -index
      }
      switch (index) {
        case 1:
          query += 'traqid'
          break
        case 2:
          query += 'submitted_at'
          break
        default:
          query += index - 2
      }
      context.emit('get-results', '?sort=' + query)
    }

    return {
      ...toRefs(state),
      isColumnActive,
      isColumnHidden,
      toggleShowColumn,
      sort
    }
  }
})
</script>
