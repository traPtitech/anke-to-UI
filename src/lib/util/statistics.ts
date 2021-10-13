import {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails,
  ResponseBody
} from '/@/lib/apis'
import {
  TableFormTypes,
  tableFormTabs,
  isSelectType,
  isNumberType,
  isSelectTypeData,
  countData,
  CountedData,
  TEXTAREA_ADDITIONAL_LINE_NUM
} from '/@/components/Results/use/utils'

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

export const modifiedCountData = (
  resultsPerQuestion: ResultsPerQuestion
): null | CountedData[] => {
  const allTypeQuestions: AllTypeQuestionUnion[] = resultsPerQuestion.questions
  if (allTypeQuestions.length <= 0) return null
  return allTypeQuestions.map(
    (allTypeQuestion: AllTypeQuestionUnion): CountedData => ({
      title: allTypeQuestion.question.body,
      type: allTypeQuestion.type,
      data: generateIdTable(allTypeQuestion.type, allTypeQuestion.results),
      total: generateStats(allTypeQuestion.type, allTypeQuestion.results),
      length: allTypeQuestion.results.length
    })
  )
}

//うまく変えられそうで変えられない…質問ひとつあるのでコメントに書きます
const generateIdTable = (
  questionType: string,
  answers: StringResult | ArrayResult
): [choice: string | number, ids: string[]][] => {
  const total = new Map()
  answers.forEach((answer: aStringResult | anArrayResult) => {
    if (isSelectType(questionType)) {
      ;(<string[]>answer).forEach(value => {
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
  answers: StringResult | ArrayResult
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

export type StringResult = aStringResult[]

export type ArrayResult = anArrayResult[]

export type aStringResult = Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: string }

export type anArrayResult = Omit<ResonsePerQuestionWithUser, 'response'> & {
  option_response: string
}
