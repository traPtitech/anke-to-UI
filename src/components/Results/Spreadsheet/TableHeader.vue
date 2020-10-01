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
          :toggle-show-column="toggleShowColumn"
          :is-column-hidden="isColumnHidden"
          :header="header"
          :sorted="sorted"
          :sort="sort"
        />
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import HeaderElem from '/@/components/Results/Spreadsheet/HeaderElem.vue'

type Props = {
  tableHeaders: string[]
  sorted: number
  showColumn: boolean[]
}

export default defineComponent({
  name: 'TableHeader',
  components: {
    HeaderElem
  },
  setup(props: Props, context) {
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
