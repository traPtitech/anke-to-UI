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
        <span class="header-wrapper">
          <span class="header-icon-left" @click="toggleShowColumn(k)">
            <Icon
              :name="isColumnHidden(k) ? 'eye-closed' : 'eye'"
              color="var(--base-darkbrown)"
              class="clickable"
            />
          </span>
          <span class="header-label">
            {{ header }}
          </span>
          <span
            class="header-icon-right clickable"
            :class="sorted !== k + 1 ? 'ti-angle-up' : 'ti-angle-down'"
            @click="sort(k + 1)"
          ></span>
        </span>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

type Props = {
  tableHeaders: string[]
  sorted: number
  showColumn: boolean[]
}

export default defineComponent({
  name: 'TableHeader',
  components: {
    Icon
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
      isColumnActive,
      isColumnHidden,
      toggleShowColumn,
      sort
    }
  }
})
</script>
