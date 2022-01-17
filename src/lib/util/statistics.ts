import { isDataView } from 'util/types'
import {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails,
  ResponseBody
} from '/@/lib/apis'

export const adjustQuestions = (
  questionnaire: QuestionnaireByID,
  questions: QuestionDetails[],
  results: ResponseResult[]
): ResultsPerQuestion => {
  const resQuestions: BaseTypeQuestion[] = questions.map(q => {
    const resultsPerQuestionWithUser = results
      .map(r =>
        r.body.map(body => ({
          ...body,
          modified_at: r.modified_at,
          submitted_at: r.submitted_at,
          traqID: r.traqID
        }))
      )
      .map(bodies => bodies.find(v => v.questionID === q.questionID))
      .filter((v): v is Exclude<typeof v, undefined> => !!v)
    return {
      type: q.question_type,
      question: q,
      results: resultsPerQuestionWithUser
    }
  })
  const validTypeQuestion: AllTypeQuestionUnion[] = []
  resQuestions.forEach(v => {
    if (isValidTypeQuestion(v)) {
      validTypeQuestion.push(v)
    }
  })
  return {
    questionnaire: questionnaire,
    questions: validTypeQuestion
  }
}

export interface TextTypeQuestion {
  type: 'Text'
  question: Omit<
    QuestionDetails,
    | 'questionnaireID'
    | 'max_bound'
    | 'min_bound'
    | 'options'
    | 'regex_pattern'
    | 'scale_label_left'
    | 'scale_label_right'
    | 'scale_max'
    | 'scale_min'
  >
  results: StringResult
}

export interface TextAreaTypeQuestion {
  type: 'TextArea'
  question: Omit<
    QuestionDetails,
    | 'questionnaireID'
    | 'max_bound'
    | 'min_bound'
    | 'options'
    | 'regex_pattern'
    | 'scale_label_left'
    | 'scale_label_right'
    | 'scale_max'
    | 'scale_min'
  >
  results: StringResult
}

export interface NumberTypeQuestion {
  type: 'Number'
  question: Omit<
    QuestionDetails,
    | 'questionnaireID'
    | 'options'
    | 'regex_pattern'
    | 'scale_label_left'
    | 'scale_label_right'
    | 'scale_max'
    | 'scale_min'
  >
  results: StringResult
}

export interface MultipleChoiceTypeQuestion {
  type: 'MultipleChoice'
  question: Omit<
    QuestionDetails,
    | 'questionnaireID'
    | 'max_bound'
    | 'min_bound'
    | 'regex_pattern'
    | 'scale_label_left'
    | 'scale_label_right'
    | 'scale_max'
    | 'scale_min'
  >
  results: ArrayResult
}

export interface CheckboxTypeQuestion {
  type: 'Checkbox'
  question: Omit<
    QuestionDetails,
    | 'questionnaireID'
    | 'max_bound'
    | 'min_bound'
    | 'regex_pattern'
    | 'scale_label_left'
    | 'scale_label_right'
    | 'scale_max'
    | 'scale_min'
  >
  results: ArrayResult
}

export interface LinearScaleTypeQuestion {
  type: 'LinearScale'
  question: Omit<
    QuestionDetails,
    'questionnaireID' | 'max_bound' | 'min_bound' | 'options' | 'regex_pattern'
  >
  results: StringResult
}

export interface ResonsePerQuestionWithUser extends ResponseBody {
  submitted_at: string
  modified_at: string
  traqID: string
}

export interface ResultsPerQuestion {
  questionnaire: QuestionnaireByID
  questions: AllTypeQuestionUnion[]
}

export type AllTypeQuestionUnion =
  | TextTypeQuestion
  | TextAreaTypeQuestion
  | MultipleChoiceTypeQuestion
  | NumberTypeQuestion
  | CheckboxTypeQuestion
  | LinearScaleTypeQuestion

export interface BaseTypeQuestion {
  type: QuestionTypeUnion
  question: Partial<QuestionDetails>
  results: ResonsePerQuestionWithUser[]
}

export type QuestionTypeUnion =
  | 'Text'
  | 'TextArea'
  | 'Number'
  | 'MultipleChoice'
  | 'Checkbox'
  | 'LinearScale'

export const isValidTypeQuestion = (
  question: BaseTypeQuestion
): question is AllTypeQuestionUnion =>
  [
    'Text',
    'TextArea',
    'Number',
    'MultipleChoice',
    'Checkbox',
    'LinearScale'
  ].includes(question.type)

//isSelectTypeの型ガード版
export const isArrayQuestion = (
  question: AllTypeQuestionUnion
): question is CheckboxTypeQuestion | MultipleChoiceTypeQuestion =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(question.type)

//isNumberTypeの型ガード版
export const isNumberQuestion = (
  question: AllTypeQuestionUnion
): question is NumberTypeQuestion | LinearScaleTypeQuestion =>
  ['LinearScale', 'Number'].includes(question.type)

//['MultipleChoice', 'Checkbox', 'Dropdown'
export type ArrayResult = (Omit<ResonsePerQuestionWithUser, 'response'> & {
  option_response: string
})[]

//'text'とか,'LinearScale', 'Number'は数値にしてOK
export type StringResult = (Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: string })[]

export const generateIdTable = (
  answers: AllTypeQuestionUnion
): [choice: string, ids: string[]][] => {
  const total = new Map<string, string[]>()
  if (isArrayQuestion(answers)) {
    answers.results.forEach(answer => {
      answer.option_response.forEach(value => {
        if (!total.has(value)) {
          total.set(value, [])
        }
        const strings = total.get(value)
        if (typeof strings !== 'undefined') {
          strings.push(answer.traqID)
        }
      })
    })
  } else {
    answers.results.forEach(answer => {
      if (!total.has(answer.response)) {
        total.set(answer.response, [])
      }
      const strings = total.get(answer.response)
      if (typeof strings !== 'undefined') {
        strings.push(answer.traqID)
      }
    })
  }
  const arr = [...total]
  if (isNumberQuestion(answers)) {
    arr.sort((a, b) => Number(b[0]) - Number(a[0]))
  }
  return arr
}

export const generateStats = (
  answers: NumberTypeQuestion | LinearScaleTypeQuestion
): {
  average: string
  standardDeviation: string
  median: string
  mode: string
} => {
  const average =
    answers.results.reduce((acc, answer) => acc + Number(answer.response), 0) /
    answers.results.length
  const variance =
    answers.results
      .map(answer => (Number(answer.response) - average) ** 2)
      .reduce((acc, value) => acc + value) / answers.results.length

  const center = Math.floor(answers.results.length / 2)
  const sorted = answers.results.sort(
    (a, b) => Number(a.response) - Number(b.response)
  )
  let median = 0
  if (answers.results.length % 2 === 0) {
    median =
      (Number(sorted[center - 1].response) + Number(sorted[center].response)) *
      0.5
  } else {
    median = Number(sorted[center].response)
  }

  //この関数のここから下は未変更
  //この関数なんのためにこれ以降の処理をしてるのかわかんなかったんですがわかりますか？
  //わかんないならちょっと元のコードを真剣に読みます
  const table = new Map()
  answers.results.forEach(answer => {
    if (!table.has(answer.response)) table.set(answer.response, [])
    table.get(answer.response).push()
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

/*
export type toMarkdownArrayQuestion = {
  body: string
  count: string
  percentage: string
  respondent: string
}

export type toMarkdownNotArrayQuestion = {
  body: string
  count: string
  respondent: string
}

export type toMarkdownAnswer =
  | toMarkdownArrayQuestion
  | toMarkdownNotArrayQuestion


export const questionToMarkdown = (
  question: AllTypeQuestionUnion
): toMarkdownAnswer[]=> {
  const data: [choice: string, ids: string[]][] =
            generateIdTable(question)
            if (typeof data !== 'undefined') {
              if (isArrayQuestion(question)) {
                let ans:toMarkdownArrayQuestion[] = {body:'',count:'',percentage:'',respondent:''}
                //for(let i =0;i<data.length;i++){
                for(const value of data){
                  const body1 = value[0]

                }
                return ans
              }
}

const getnerateMarkdownTable = <Key extends string>(
  header: ReadonlyArray<[Key, string]>,
  rows: ReadonlyArray<Record<Key, string>>
) => {
  let head = "| ";
  let partition = "| ";
  for (let i = 0; i < header.length; i++) {
    head = head.concat(header[i][1], " | ");
    partition = partition.concat(" - | ");
  }
  let res = [
    head,
    partition,
    `| ${rows.body} | ${rows.count} | ${rows.percentage} | ${rows.respondent} |`,
  ];
  return res.join("\n");
}
*/
