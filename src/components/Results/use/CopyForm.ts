import {
  AllTypeQuestionUnion,
  isArrayQuestion,
  isNumberQuestion,
  generateChoiceIdsArray
} from './statistics'

//CopyのBaseを作る系
type FormInfo<Key extends string> = {
  header: ReadonlyArray<[Key, string]>
  rows: ReadonlyArray<Record<Key, string>>
}

const questionToFormBase = (
  questionData: AllTypeQuestionUnion
):
  | FormInfo<'body' | 'count' | 'percentage' | 'respondent'>
  | FormInfo<'body' | 'count' | 'respondent'> => {
  const choiceIds = generateChoiceIdsArray(questionData)
  if (isArrayQuestion(questionData) || isNumberQuestion(questionData)) {
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
    > = choiceIds.map(([choice, ids]) => ({
      body: String(choice),
      count: `${ids.length}件`,
      percentage: `${(
        (ids.length /
          (questionData.results.length !== 0
            ? questionData.results.length
            : 1)) *
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
      choiceIds.map(([choice, ids]) => ({
        body: String(choice),
        count: `${ids.length}件`,
        respondent: `${ids.length !== 0 ? `:@${ids.join(':,:@')}:` : ''}`
      }))
    return { header, rows }
  }
}

type ArrayFormInfo = FormInfo<'body' | 'count' | 'percentage' | 'respondent'>

type NotArrayFormInfo = FormInfo<'body' | 'count' | 'respondent'>

const hasPercentageFormInfo = (
  question: ArrayFormInfo | NotArrayFormInfo
): question is ArrayFormInfo => question.header.length === 4

//CopyMarkdown系
const generateMarkdownTable = (
  answer: ArrayFormInfo | NotArrayFormInfo
): string[] => {
  let head = '| '
  let partition = '| '
  for (let i = 0; i < answer.header.length; i++) {
    head = head.concat(answer.header[i][1], ' | ')
    partition = partition.concat(' - |')
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

export const generateQuestionMarkdownTable = (
  questionData: AllTypeQuestionUnion
) => {
  let res = [`# ${questionData.question.body}`]
  res = res.concat(generateMarkdownTable(questionToFormBase(questionData)))
  res.concat([''])
  return res.join('\n')
}

//CopyCSV系

const generateCSVTable = (
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

export const generateQuestionCSVTable = (
  questionData: AllTypeQuestionUnion
) => {
  let res = [`"${questionData.question.body}"`]
  res = res.concat(generateCSVTable(questionToFormBase(questionData)))
  res.concat([''])
  return res.join('\n')
}
