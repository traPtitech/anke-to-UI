import { ResultsPerQuestion, isArrayQuestion } from './statistics'
import { getTimeLimit } from '/@/components/UI/use/useOptions'

type FormInfo = {
  header: SpreadForm
  rows: SpreadForm[]
}
type SpreadForm = {
  readonly traqID: string
  readonly responseID?: number
  readonly submittedAt: string
  results: string[]
}

const generateHeader = (resultsPerQuestion: ResultsPerQuestion) => {
  const spreadHeader: SpreadForm = {
    traqID: 'traQID',
    submittedAt: '回答日時',
    results: resultsPerQuestion.questions.map(v => v.question.body)
  }
  return spreadHeader
}
const questionToSpreadForm = (
  resultsPerQuestion: ResultsPerQuestion
): FormInfo => {
  const spreadForm: SpreadForm[] = resultsPerQuestion.questions[0].results.map(
    result => {
      return {
        traqID: result.traqID,
        responseID: result.responseID,
        submittedAt: getTimeLimit(result.modified_at),
        results: []
      }
    }
  )

  for (let i = 0; i < resultsPerQuestion.questions.length; i++) {
    const question = resultsPerQuestion.questions[i]
    question.results.forEach(result => {
      const index = spreadForm.findIndex(
        response => response.responseID === result.responseID
      )
      const res =
        'option_response' in result // isArrayQuestion(question)
          ? result.option_response.join(',')
          : result.response
      spreadForm[index].results.push(res)
    })
  }
  return { header: generateHeader(resultsPerQuestion), rows: spreadForm }
}
//DownloadMarkdown系
const generateEachMarkdown = (eachResponse: SpreadForm): string => {
  return `| ${eachResponse.traqID} | ${
    eachResponse.submittedAt
  } | ${eachResponse.results.join(' | ')} |`
}
const generateQuestionMarkdownSpreadseetForm = (
  response: FormInfo
): string[] => {
  //header
  const header = response.header
  const head = generateEachMarkdown(response.header)
  const preresponse = new Array(header.results.length).fill('-')
  const prepartition = { traqID: '-', submittedAt: '-', results: preresponse }
  const partition = generateEachMarkdown(prepartition)
  //rows
  const eachRows = response.rows.map(spread => generateEachMarkdown(spread))
  return [head, partition, ...eachRows]
}
export const generateQuestionMarkdownSpreadseet = (
  resultPerQuestion: ResultsPerQuestion
): string => {
  return generateQuestionMarkdownSpreadseetForm(
    questionToSpreadForm(resultPerQuestion)
  ).join('\n')
}

//DownloadCSV系
const generateEachCSV = (eachResponse: SpreadForm): string => {
  return `"${eachResponse.traqID}","${
    eachResponse.submittedAt
  }","${eachResponse.results.join('","')}"`
}
const generateQuestionCSVSpreadseetForm = (response: FormInfo): string[] => {
  //header
  const head = generateEachCSV(response.header)
  //rows
  const eachRows = response.rows.map(spread => generateEachCSV(spread))
  return [head, ...eachRows]
}
export const generateQuestionCSVSpreadseet = (
  resultsPerQuestion: ResultsPerQuestion
): string => {
  return generateQuestionCSVSpreadseetForm(
    questionToSpreadForm(resultsPerQuestion)
  ).join('\n')
}

//Download系
export const download = (name: string, data: string, extention: string) => {
  const blob = new Blob([data], { type: `text/plain` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.download = `${name}.${extention}`
  a.href = url
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
