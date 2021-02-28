import { ResponseBody } from '/@/lib/apis'
import { results } from './dummyData'
export const defaultColumns = [
  { name: 'traqID', label: 'traQID' },
  { name: 'submitted_at', label: '回答日時' }
]
export const tableFormTabs = ['view', 'markdown', 'csv']
export const detailTabs = ['statistics', 'spreadsheet', 'individual']
export const tableForm = 'view'
export const isTextTable = ['markdown', 'csv'].includes(tableForm)
export const isSelectType = (type: string): boolean =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)
export const isNumberType = (type: string): boolean =>
  ['LinearScale', 'Number'].includes(type)
export const textTables = {
  markdown: '',
  csv: ''
}
export const getTableRow = (index: number): string[] => {
  // typecheck対策
  // const ret = defaultColumns
  //   .map(column => results[index][column.name])
  const ret = [results[index].traqID, results[index].submitted_at].concat(
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
      // type check対策
      // return tableForm === 'markdown'
      //   ? body.response.replace(/\n/g, '<br>')
      //   : body.response
      return body.response
    default:
      return body.response
  }
}

export type CountedData = {
  title: string
  type: string
  length?: number
  total: {
    average: number
    standardDeviation: number
    median: number
    mode: number
  }
  data?: [choice: string | number, ids: string[]][]
}
