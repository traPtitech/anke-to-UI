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

export const modifiedCountData = (
  rpq: ResultsPerQuestion
): null | (CountedDataNumber | CountedDataNotNumber)[] => {
  const allTypeQuestions: AllTypeQuestionUnion[] = rpq.questions
  if (allTypeQuestions.length <= 0) return null
  return allTypeQuestions.map(
    (atq: AllTypeQuestionUnion): CountedDataNumber | CountedDataNotNumber => {
      if (isNumberQuestion(atq.type, atq))
        return {
          title: atq.question.body,
          type: atq.type,
          data: generateIdTable(atq),
          total: generateStats(atq),
          length: atq.results.length
        }
      else
        return {
          title: atq.question.body,
          type: atq.type,
          data: generateIdTable(atq),
          total: null,
          length: atq.results.length
        }
    }
  )
}

const generateIdTable = (
  answers: AllTypeQuestionUnion
): [choice: string, ids: string[]][] => {
  //なんの型かわかんないのでMap<string, string[]>みたいにしてほしいです
  //80行目などでundifinedが取り除けませんでした…
  const total = new Map<string, string[]>()
  if (isArrayQuestion(answers.type, answers)) {
    answers.results.forEach(answer => {
      answer.option_response.forEach(value => {
        if (!total.has(value)) total.set(value, [])
        total.get(value).push(answer.traqID)
      })
    })
  } else {
    answers.results.forEach(answer => {
      if (!total.has(answer.response)) total.set(answer.response, [])
      total.get(answer.response).push(answer.traqID)
    })
  }
  //ここはconstがいいです
  const arr = [...total]
  if (isNumberQuestion(answers.type)) {
    arr.sort((a, b) => b[0] - a[0])
  }
  return arr
}

const generateStats = (
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
  const median =
    // ここは三項演算子じゃなくてifで分岐してほしいです
    // ↑ できてないです
    answers.results.length % 2 == 0
      ? Number(sorted[center - 1].response) +
        Number(sorted[center].response) * 0.5
      : Number(sorted[center].response)

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
  type: string,
  question?: AllTypeQuestionUnion
): question is CheckboxTypeQuestion | MultipleChoiceTypeQuestion =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)

//isNumberTypeの型ガード版
export const isNumberQuestion = (
  type: string,
  question?: AllTypeQuestionUnion
): question is NumberTypeQuestion | LinearScaleTypeQuestion =>
  ['LinearScale', 'Number'].includes(type)

//['MultipleChoice', 'Checkbox', 'Dropdown'
export type ArrayResult = (Omit<ResonsePerQuestionWithUser, 'response'> & {
  option_response: string
})[]

//'text'とか,'LinearScale', 'Number'は数値にしてOK
export type StringResult = (Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: string })[]

export type CountedDataNumber = {
  title: string
  type: string
  length: number
  total: {
    average: string
    standardDeviation: string
    median: string
    mode: string
  }
  data: [choice: string, ids: string[]][]
}

export type CountedDataNotNumber = {
  title: string
  type: string
  length: number
  total: null
  data: [choice: string, ids: string[]][]
}

//以下は気にしないでください。最後に消します。----------------------------------------
//わんちゃんあとで再利用するかもぐらいのもの

/*
//これいらんかも
//'LinearScale', 'Number'
export type NumberResult = (Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: number })[]
*/
/*
const generateIdTable = (
  questionType: string,
  answers: StringResult | ArrayResult
): [choice: string | number, ids: string[]][] => {
  const total = new Map()
  answers.forEach((answer: aStringResult | anArrayResult) => {
    if (isAnArrayResult(questionType, answer)) {
      answer.option_response.forEach(value => {
        if (!total.has(value)) total.set(value, [])
        total.get(value).push(answer.traqID)
      })
    } else {
      if (!total.has(answer.response)) total.set(answer.response, [])
      total.get(answer.response).push(answer.traqID)
    }
  })
  let arr = [...total]
  if (isNumberType(questionType)) arr = arr.sort((a, b) => b[0] - a[0])
  return arr
}
*/

/*
//isSelectTypeの型ガード版
export const isAnArrayResult = (
  type: string,
  result?: aStringResult | anArrayResult
): result is anArrayResult =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)

//isNumberTypeの型ガード版
export const isAStringResult = (
  type: string,
  result?: aStringResult | anArrayResult
): result is aNumberResult => ['LinearScale', 'Number'].includes(type)

//なんかこうしないと型ガードしたときにうまくいかなかった
export type StringResult = aStringResult[]
export type ArrayResult = anArrayResult[]

//無駄かもだけど型判定のために必要な気がした
export type aStringResult = Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: string | number }

export type anArrayResult = Omit<ResonsePerQuestionWithUser, 'response'> & {
  option_response: string
}
//
export type aNumberResult = aStringResult & { response: number }
*/
