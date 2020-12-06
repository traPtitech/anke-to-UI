<template>
  <tbody>
    <tr v-for="(row, j) in results" :key="j">
      <td v-for="(item, k) in getTableRow(j)" :key="k">
        {{ item }}
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ResponseBody } from '/@/lib/apis'
import * as dummyData from '/@/components/Results/use/dummyData'
import * as utils from '/@/components/Results/use/utils'

export default defineComponent({
  name: 'TableHeader',
  props: {
    tableHeaders: {
      type: Array as PropType<string[]>,
      required: true
    },
    showColumn: {
      type: Array as PropType<boolean[]>,
      required: true
    },
    tableForm: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const getTableRow = (index: number): string[] => {
      const ret = utils.defaultColumns
        .map(column => dummyData.results[index][column.name])
        .concat(
          (() => {
            const mapper: string[] = []
            dummyData.results[index].body.forEach((response: ResponseBody) =>
              mapper.push(responseToString(response))
            )
            return mapper
          })()
        )
      return ret
    }
    const responseToString = (body: ResponseBody): string => {
      let ret = ''
      switch (body.question_type) {
        case 'MultipleChoice':
        case 'Checkbox':
        case 'Dropdown':
          body.option_response.forEach((response: string) => {
            if (ret !== '') {
              ret += ', '
            }
            ret += response
          })
          return ret
        case 'TextArea':
          return props.tableForm === 'markdown'
            ? body.response.replace(/\n/g, '<br>')
            : body.response
        default:
          return body.response
      }
    }

    return {
      getTableRow
    }
  }
})
</script>
