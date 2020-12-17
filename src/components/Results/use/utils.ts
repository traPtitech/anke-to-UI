import { ResponseBody } from '/@/lib/apis'
import { results } from './dummyData'
export const defaultColumns = [
  { name: 'traqID', label: 'traQID' },
  { name: 'submitted_at', label: '回答日時' }
]
export const tableFormTabs = ['view', 'markdown', 'csv']
export const detailTabs = ['Statistics', 'Spreadsheet', 'Individual']
export const selectedTab = 'Spreadsheet'
export const tableForm = 'view'
export const isTextTable = ['markdown', 'csv'].includes(tableForm)
export const isSelectType = (type: string) =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)
export const isNumberType = (type: string) =>
  ['LinearScale', 'Number'].includes(type)
export const textTables = {
  markdown: '',
  csv: ''
}
export const getTableRow = (index: number): string[] => {
  const ret = defaultColumns
    .map(column => results[index][column.name])
    .concat(
      (() => {
        const mapper: string[] = []
        results[index].body.forEach((response: ResponseBody) =>
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
      return tableForm === 'markdown'
        ? body.response.replace(/\n/g, '<br>')
        : body.response
    default:
      return body.response
  }
}

export type CountedData = {
  title: string
  type: string
  total: {
    average: number
    standardDeviation: number
    median: number
    mode: number
  }
  data: {
    choice: string | number
    ids: string
  }[]
}
