import { ResultsPerQuestion, isArrayQuestion } from './statistics'

type FormInfo = {
  header: SpreadForm
  rows: SpreadForm[]
}
type SpreadForm = {
  readonly traq_id: string
  readonly response_id?: number
  readonly submitted_at: string
  results: string[]
}

const generateHeader = (resultsPerQuestion: ResultsPerQuestion) => {
  const spreadHeader: SpreadForm = {
    traq_id: 'traQID',
    submitted_at: '回答日時',
    results: []
  }
  for (let i = 0; i < resultsPerQuestion.questions.length; i++) {
    spreadHeader.results.push(resultsPerQuestion.questions[i].question.body)
  }
  return spreadHeader
}

const questionToSpreadForm = (
  resultsPerQuestion: ResultsPerQuestion
): FormInfo => {
  const spreadForm: SpreadForm[] = []
  resultsPerQuestion.questions[0].results.map(result => {
    spreadForm.push({
      traq_id: result.traqID + '',
      response_id: result.responseID,
      submitted_at: result.modified_at,
      results: []
    })
  })
  for (let i = 0; i < resultsPerQuestion.questions.length; i++) {
    const question = resultsPerQuestion.questions[i]
    if (isArrayQuestion(question)) {
      question.results.forEach(result => {
        const index = spreadForm.findIndex(
          response => response.response_id === result.responseID
        )
        spreadForm[index].results.push(result.option_response.join(','))
      })
    } else {
      question.results.forEach(result => {
        const index = spreadForm.findIndex(
          response => response.response_id === result.responseID
        )
        spreadForm[index].results.push(result.response)
      })
    }
  }
  return { header: generateHeader(resultsPerQuestion), rows: spreadForm }
}
//DownloadMarkdown系
const generateQuestionMarkdownSpreadseetForm = (
  response: FormInfo
): string[] => {
  //header
  const header = response.header
  let head = `| ${header.traq_id} | ${header.submitted_at} | `
  let partition = '| - | - |'
  for (let i = 0; i < header.results.length; i++) {
    head = head.concat(header.results[i], ' | ')
    partition = partition.concat(' - |')
  }
  let res = [head, partition]
  //rows
  res = res.concat(
    response.rows.map(
      spread =>
        `| ${spread.traq_id} | ${spread.submitted_at} | ${spread.results.join(
          ' | '
        )}|`
    )
  )
  return res
}
export const generateQuestionMarkdownSpreadseet = (
  resultPerQuestion: ResultsPerQuestion
): string => {
  return generateQuestionMarkdownSpreadseetForm(
    questionToSpreadForm(resultPerQuestion)
  ).join('\n')
}

//DownloadCSV系
const generateQuestionCSVSpreadseetForm = (response: FormInfo): string[] => {
  //header
  const header = response.header
  let res = [
    `"${header.traq_id}","${header.submitted_at}","${header.results.join(
      '","'
    )}"`
  ]
  //rows
  res = res.concat(
    response.rows.map(
      spread =>
        `"${spread.traq_id}","${spread.submitted_at}","${spread.results.join(
          '","'
        )}"`
    )
  )
  return res
}
export const generateQuestionCSVSpreadseet = (
  resultsPerQuestion: ResultsPerQuestion
): string => {
  return generateQuestionCSVSpreadseetForm(
    questionToSpreadForm(resultsPerQuestion)
  ).join('\n')
}

//Download系
export const download = (name: string, data: string, form: string) => {
  const blob = new Blob([data], { type: `text/plain` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.download = `${name}.${form}`
  a.href = url
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
