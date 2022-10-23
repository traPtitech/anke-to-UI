import {
  AllTypeQuestionUnion,
  isArrayQuestion,
  isNumberQuestion,
  generateChoiceIdsArray
} from './statistics'

//CopyのBaseを作る系
type FormInfo<Key extends string> = {
  header: ReadonlyArray<{ key: Key; value: string }>
  rows: ReadonlyArray<Record<Key, string>>
}
type FormArrayHeader = ReadonlyArray<{ key: ArrayFormInfoKey; value: string }>
type FormArrayRows = ReadonlyArray<Record<ArrayFormInfoKey, string>>
type FormNotArrayHeader = ReadonlyArray<{
  key: NotArrayFormInfoKey
  value: string
}>
type FormNotArrayRows = ReadonlyArray<Record<NotArrayFormInfoKey, string>>
type ArrayFormInfoKey = 'body' | 'count' | 'percentage' | 'respondent'
type NotArrayFormInfoKey = 'body' | 'count' | 'respondent'

const generatePercentage = (
  questionData: AllTypeQuestionUnion,
  length: number
) => {
  ;(
    length /
    (questionData.results.length !== 0 ? questionData.results.length : 1)
  ).toFixed(2)
}
const questionToFormBase = (
  questionData: AllTypeQuestionUnion
): FormInfo<ArrayFormInfoKey> | FormInfo<NotArrayFormInfoKey> => {
  const choiceIds = generateChoiceIdsArray(questionData)
  if (isArrayQuestion(questionData) || isNumberQuestion(questionData)) {
    const header: FormArrayHeader = [
      { key: 'body', value: '回答' },
      { key: 'count', value: '回答数' },
      { key: 'percentage', value: '割合' },
      { key: 'respondent', value: 'その回答をした人' }
    ]
    const rows: FormArrayRows = choiceIds.map(([choice, ids]) => ({
      body: choice,
      count: `${ids.length}件`,
      percentage: `${generatePercentage(questionData, ids.length)}%`,
      respondent: `${ids.length !== 0 ? `:@${ids.join(':,:@')}:` : ''}`
    }))
    return { header, rows }
  } else {
    const header: FormNotArrayHeader = [
      { key: 'body', value: '回答' },
      { key: 'count', value: '回答数' },
      { key: 'respondent', value: 'その回答をした人' }
    ]
    const rows: FormNotArrayRows = choiceIds.map(([choice, ids]) => ({
      body: choice,
      count: `${ids.length}件`,
      respondent: `${ids.length !== 0 ? `:@${ids.join(':,:@')}:` : ''}`
    }))
    return { header, rows }
  }
}

//CopyMarkdown系
const generateMarkdownTable = <T extends FormInfo<string>>(
  answer: T
): string[] => {
  const headerElements = answer.header.map(v => v.value)
  const header = `| ${headerElements.join(' | ')} |`
  const partition = `| ${headerElements.map(() => '-').join(' | ')} |`
  const eachRowElements = answer.rows.map(row =>
    answer.header.map(header => row[header.key])
  )
  const eachRows = eachRowElements.map(
    eachRowElement => `| ${eachRowElement.join(' | ')} |`
  )
  return [header, partition, ...eachRows]
}

export const generateQuestionMarkdownTable = (
  questionData: AllTypeQuestionUnion
): string => {
  return [
    `# ${questionData.question.body}`,
    ...generateMarkdownTable(questionToFormBase(questionData)),
    ''
  ].join('\n')
}

//CopyCSV系

const generateCSVTable = <T extends FormInfo<string>>(answer: T): string[] => {
  const headerElements = answer.header.map(v => v.value)
  const header = `"${headerElements.join('","')}"`
  const eachRowElements = answer.rows.map(row =>
    answer.header.map(header => row[header.key])
  )
  const eachRows = eachRowElements.map(
    eachRowElement => `"${eachRowElement.join('","')}"`
  )
  return [header, ...eachRows]
}

export const generateQuestionCSVTable = (
  questionData: AllTypeQuestionUnion
): string => {
  return [
    `"${questionData.question.body}"`,
    ...generateCSVTable(questionToFormBase(questionData)),
    ''
  ].join('\n')
}
