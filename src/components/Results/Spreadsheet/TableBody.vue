<template>
  <tbody>
    <tr v-for="(row, j) in results" :key="j">
      <td
        v-for="(item, k) in getTableRow(j)"
        :key="k"
        :class="{ hidden: isColumnHidden(k) }"
      >
        {{ item }}
      </td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Responce, ResponceBody } from '/@/lib/apis'

type Props = {
  results: Responce[]
  defaultColumns: {
    name: string
    label: string
  }[]
  tableHeaders: string[]
  showColumn: boolean[]
  tableForm: string
}

export default defineComponent({
  name: 'TableHeader',
  components: {},
  props: {
    results: {
      type: Object as PropType<Response[]>,
      required: true
    },
    defaultColumns: {
      type: Array as PropType<
        {
          name: string
          label: string
        }[]
      >,
      required: true
    },
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
  setup(props: Props) {
    const getTableRow = (index: number): string[] => {
      const ret = props.defaultColumns
        .map(column => props.results[index][column.name])
        .concat(
          props.results[index].responseBody.map((response: any) =>
            responseToString(response)
          )
        )
      return ret
    }
    const responseToString = (body: ResponceBody): string => {
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

    const isColumnHidden = (index: number): boolean =>
      props.showColumn.length === props.tableHeaders.length &&
      !props.showColumn[index]

    return {
      getTableRow,
      isColumnHidden
    }
  }
})
</script>
