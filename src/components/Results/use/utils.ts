import { ResponseBody, QuestionDetails, ResponseResult } from '/@/lib/apis'
export const defaultColumns = [
  { name: 'traqID', label: 'traQID' },
  { name: 'submitted_at', label: '回答日時' }
]
export type TabTypes = '概要' | '個別'
export const tabTypes: TabTypes[] = ['概要', '個別']
export type DownloadTypes = 'Markdownでダウンロード' | 'CSVでダウンロード'
export const downloadTypes: DownloadTypes[] = [
  'Markdownでダウンロード',
  'CSVでダウンロード'
]
export type FormTypes = 'Markdown' | 'CSV'
export const formTypes = ['Markdown', 'CSV']

export const isSelectType = (type: string): boolean =>
  ['MultipleChoice', 'Checkbox'].includes(type)
export const isNumberType = (type: string): boolean =>
  ['LinearScale', 'Number'].includes(type)
export const isTextType = (type: string): boolean =>
  ['Text', 'TextArea'].includes(type)
export const isSelectTypeData = (arg: CountedData): arg is SelectTypeData =>
  ['MultipleChoice', 'Checkbox'].includes(arg.type)

export type SelectTypeData = Required<CountedData> & {
  total: null
}

export const textTables = {
  markdown: '',
  csv: ''
}

export const getTableRow = (
  results: ResponseResult[],
  index: number
): string[] => {
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
  switch (body.question_type) {
    case 'MultipleChoice':
    case 'Checkbox':
    case 'TextArea':
      // type check対策
      // return tableForm === 'markdown'
      //   ? body.response.replace(/\n/g, '<br>')
      //   : body.response
      return body.response!
    default:
      return body.response!
  }
}

// statistic系
export type CountedData = {
  title: string
  type: string
  length: number
  total: {
    average: string
    standardDeviation: string
    median: string
    mode: string
  } | null
  data: [choice: string | number, ids: string[]][]
}

type AnswerData = {
  traqId: string
  modifiedAt: string
  answer: number | string | string[]
}

const generateIdTable = (
  question: QuestionDetails,
  answers: AnswerData[]
): [choice: string | number, ids: string[]][] => {
  const total = new Map()
  const questionType = question.question_type
  if (isSelectType(questionType)) {
    for (let i = 0; i < question.options.length; i++) {
      total.set(question.options[i], [])
    }
  }
  answers.forEach((answer: AnswerData) => {
    if (isSelectType(questionType)) {
      ;(<string[]>answer.answer).forEach(value => {
        if (!total.has(value)) total.set(value, [])
        total.get(value).push(answer.traqId)
      })
    } else {
      if (!total.has(answer.answer)) total.set(answer.answer, [])
      total.get(answer.answer).push(answer.traqId)
    }
  })
  let arr = [...total]
  if (isNumberType(questionType)) arr = arr.sort((a, b) => b[0] - a[0])
  return arr
}

const generateStats = (
  questionType: string,
  answers: AnswerData[]
): {
  average: string
  standardDeviation: string
  median: string
  mode: string
} | null => {
  if (!isNumberType(questionType)) return null
  const average =
    answers.reduce((acc, answer) => acc + <number>answer.answer, 0) /
    answers.length
  const variance =
    answers
      .map(answer => (<number>answer.answer - average) ** 2)
      .reduce((acc, value) => acc + value) / answers.length

  const center = Math.floor(answers.length / 2)
  const sorted = answers.sort((a, b) => <number>a.answer - <number>b.answer)
  const median =
    answers.length % 2 == 0
      ? (<number>sorted[center - 1].answer + <number>sorted[center].answer) *
        0.5
      : <number>sorted[center].answer

  const table = new Map()
  answers.forEach(answer => {
    if (!table.has(answer.answer)) table.set(answer.answer, [])
    table.get(answer.answer).push()
  })

  const arr = [...table].sort((a, b) => b[1] - a[1])
  const mode = arr
    .filter(v => arr[0][1] === v[1])
    .map(v => v[0])
    .join(', ')

  return {
    average: average + '',
    standardDeviation: Math.sqrt(variance).toFixed(2),
    median: median + '',
    mode
  }
}

const generateLength = (
  questionType: string,
  answers: AnswerData[]
): number => {
  if (questionType === 'Checkbox') {
    return answers.reduce((sum, individual): number => {
      if (typeof individual.answer === 'object') {
        return sum + individual.answer.length
      } else {
        return 1
      }
    }, 0)
  } else {
    return answers.length
  }
}

export const countData = (
  questions: QuestionDetails[],
  results: ResponseResult[]
): CountedData[] => {
  if (questions.length <= 0 || results.length <= 0) return []
  const data: AnswerData[][] = Array.from(
    { length: questions.length },
    () => []
  )

  // 各個人のResponsesをquestion毎にdataへ格納
  results.forEach((result: ResponseResult) => {
    const answers = result.body

    answers.forEach((answer: ResponseBody, index: number) => {
      data[index].push({
        traqId: result.traqID,
        modifiedAt: result.modified_at,
        answer: isSelectType(answer.question_type)
          ? answer.option_response!
          : isNumberType(answer.question_type)
          ? +!answer.response
          : answer.response!
      })
    })
  })

  return questions.map(
    (question: QuestionDetails, index: number): CountedData => ({
      title: question.body,
      type: question.question_type,
      data: generateIdTable(question, data[index]),
      total: generateStats(question.question_type, data[index]),
      // 複数選択肢(Checkbox)のときはlengthが異なる
      length: generateLength(question.question_type, data[index])
    })
  )
}

//CopyのBaseを作る系
export type FormInfo<Key extends string> = {
  header: ReadonlyArray<[Key, string]>
  rows: ReadonlyArray<Record<Key, string>>
}

export const questionToFormBase = (
  countedData: CountedData
):
  | FormInfo<'body' | 'count' | 'percentage' | 'respondent'>
  | FormInfo<'body' | 'count' | 'respondent'> => {
  if (isSelectType(countedData.type) || isNumberType(countedData.type)) {
    const header: ReadonlyArray<
      ['body' | 'count' | 'percentage' | 'respondent', string]
    > = [
      ['body', '回答'],
      ['count', '回答数'],
      ['percentage', '割合'],
      ['respondent', 'その回答をした人']
    ]
    const rows: ReadonlyArray<
      Record<'body' | 'count' | 'percentage' | 'respondent', string>
    > = countedData.data.map(([choice, ids]) => ({
      body: String(choice),
      count: `${ids.length}件`,
      percentage: `${(
        (ids.length / (countedData.length !== 0 ? countedData.length : 1)) *
        100
      ).toFixed(2)}%`,
      respondent: `${ids.length !== 0 ? `:@${ids.join(':,:@')}:` : ''}`
    }))
    return { header, rows }
  } else {
    const header: ReadonlyArray<['body' | 'count' | 'respondent', string]> = [
      ['body', '回答'],
      ['count', '回答数'],
      ['respondent', 'その回答をした人']
    ]
    const rows: ReadonlyArray<Record<'body' | 'count' | 'respondent', string>> =
      countedData.data.map(([choice, ids]) => ({
        body: String(choice),
        count: `${ids.length}件`,
        respondent: `${ids.length !== 0 ? `:@${ids.join(':,:@')}:` : ''}`
      }))
    return { header, rows }
  }
}

type ArrayFormInfo = FormInfo<'body' | 'count' | 'percentage' | 'respondent'>

type NotArrayFormInfo = FormInfo<'body' | 'count' | 'respondent'>

export const hasPercentageFormInfo = (
  question: ArrayFormInfo | NotArrayFormInfo
): question is ArrayFormInfo => question.header.length === 4

//CopyMarkdown系
export const generateMarkdownTable = (
  answer: ArrayFormInfo | NotArrayFormInfo
): string[] => {
  let head = '| '
  let partition = '| '
  for (let i = 0; i < answer.header.length; i++) {
    head = head.concat(answer.header[i][1], ' | ')
    partition = partition.concat(' - | ')
  }
  let res = [head, partition]
  if (hasPercentageFormInfo(answer)) {
    res = res.concat(
      answer.rows.map(
        ananswer =>
          `| ${ananswer.body} | ${ananswer.count} | ${ananswer.percentage} | ${ananswer.respondent} |`
      )
    )
  } else {
    res = res.concat(
      answer.rows.map(
        ananswer =>
          `| ${ananswer.body} | ${ananswer.count} | ${ananswer.respondent} |`
      )
    )
  }
  return res
}

export const generateQuestionMarkdownTable = (question: CountedData) => {
  let res = [`# ${question.title}`]
  res = res.concat(generateMarkdownTable(questionToFormBase(question)))
  res.concat([''])
  return res.join('\n')
}

//CopyCSV系

export const generateCSVTable = (
  answer: ArrayFormInfo | NotArrayFormInfo
): string[] => {
  let head = ''
  for (let i = 0; i < answer.header.length; i++) {
    head = head.concat(`"${answer.header[i][1]}"`, ',')
  }
  let res = [head.slice(0, -1)]
  if (hasPercentageFormInfo(answer)) {
    res = res.concat(
      answer.rows.map(
        ananswer =>
          `"${ananswer.body}","${ananswer.count}","${ananswer.percentage}","${ananswer.respondent}"`
      )
    )
  } else {
    res = res.concat(
      answer.rows.map(
        ananswer =>
          `"${ananswer.body}","${ananswer.count}","${ananswer.respondent}"`
      )
    )
  }
  return res
}

export const generateQuestionCSVTable = (question: CountedData) => {
  let res = [`"${question.title}"`]
  res = res.concat(generateCSVTable(questionToFormBase(question)))
  res.concat([''])
  return res.join('\n')
}
