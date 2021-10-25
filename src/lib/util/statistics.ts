import {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails,
  ResponseBody
} from '/@/lib/apis'
import { CountedData } from '/@/components/Results/use/utils'

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
): null | CountedData[] => {
  const allTypeQuestions: AllTypeQuestionUnion[] = rpq.questions
  if (allTypeQuestions.length <= 0) return null
  return allTypeQuestions.map((atq: AllTypeQuestionUnion): CountedData => {
    if (isNumberResult(atq.type, atq.results))
      return {
        title: atq.question.body,
        type: atq.type,
        data: generateIdTable(atq.type, atq.results),
        total: generateStats(atq),
        length: atq.results.length
      }
    else
      return {
        title: atq.question.body,
        type: atq.type,
        data: generateIdTable(atq.type, atq.results),
        total: null,
        length: atq.results.length
      }
  })
}

//この関数はTextTypeQuestionとかを受け取ってほしいです
//(一段目の分岐が分かりやすくなる)
//ユニオン型じゃなくてどっちかにしてほしいです
//ちゃんと使ってるところのコード読んでないけど多分string型で困らない
const generateIdTable = (
  questionType: string,
  answers: StringResult | ArrayResult
): [choice: string | number, ids: string[]][] => {
  //なんの型かわかんないのでMap<string, string[]>みたいにしてほしいです
  const total = new Map()
  if (isArrayResult(questionType, answers)) {
    answers.forEach(answer => {
      answer.option_response.forEach(value => {
        if (!total.has(value)) total.set(value, [])
        total.get(value).push(answer.traqID)
      })
    })
  } else {
    answers.forEach(answer => {
      if (!total.has(answer.response)) total.set(answer.response, [])
      total.get(answer.response).push(answer.traqID)
    })
  }
  //ここはconstがいいです
  let arr = [...total]
  if (isNumberResult(questionType)) arr = arr.sort((a, b) => b[0] - a[0])
  return arr
}
//この関数も同様にTextTypeQuestionとかのなかでisNumberResultがtrue
//のものを受け取って、nullは返さないようにしてほしいです
const generateStats = (
  //isNumberResult(atq.type)がtrue野みう受け取る
  answers: NumberTypeQuestion | LinearScaleTypeQuestion
): {
  average: string
  standardDeviation: string
  median: string
  mode: string
} => {
  //rewponseがnumber型であると保証するためのガード
  //というかこれifで書いちゃうとこの関数の返り値をうまく出せなくて困ってます
  //前はそうじゃないときはnullを返せてたから良かったけど…
  //「かっこ」の位置がまちがっているのでしょうか
  if (isNumberResult(answers.type, answers.results)) {
    const average =
      answers.results.reduce(
        (acc: number, answer) => acc + answer.response,
        0
      ) / answers.results.length
    const variance =
      answers
        .map(answer => (answer.response - average) ** 2)
        .reduce((acc, value) => acc + value) / answers.length

    const center = Math.floor(answers.length / 2)
    const sorted = answers.sort((a, b) => a.response - b.response)
    const median =
      // ここは三項演算子じゃなくてifで分岐してほしいです
      answers.length % 2 == 0
        ? (sorted[center - 1].response + sorted[center].response) * 0.5
        : sorted[center].response
    //この関数なんのためにこれ以降の処理をしてるのかわかんなかったんですがわかりますか？
    //わかんないならちょっと元のコードを真剣に読みます
    //なんの型かわかんないのでMap<string, string[]>みたいにしてほしいです
    const table = new Map()
    answers.forEach(answer => {
      if (!table.has(answer.response)) table.set(answer.response, [])
      table.get(answer.response).push()
    })

    const arr = [...table].sort((a, b) => b[1] - a[1])
    const mode = arr
      .filter(v => arr[0][1] === v[1])
      .map(v => v[0])
      .join(', ')
  }
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
export const isArrayResult = (
  type: string,
  result?: StringResult | ArrayResult
): result is ArrayResult =>
  ['MultipleChoice', 'Checkbox', 'Dropdown'].includes(type)

//isNumberTypeの型ガード版
export const isNumberResult = (
  type: string,
  result?: StringResult | ArrayResult
): result is NumberResult => ['LinearScale', 'Number'].includes(type)

//['MultipleChoice', 'Checkbox', 'Dropdown'
export type ArrayResult = (Omit<ResonsePerQuestionWithUser, 'response'> & {
  option_response: string
})[]

//'LinearScale', 'Number'
export type NumberResult = (Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: number })[]

//'text'とか
/**
 * たぶんresponseにはもともとstringしかはいらないっぽい
 * StringResultのresponseをstringとnumberのユニオンにしとかないと
 * generateStats関数で計算するときに数としてresponseを扱えなかったような。。
 * →generateStats関数を変更する！
 */
export type StringResult = (Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: string })[]

//以下は気にしないでください。最後に消します。----------------------------------------
//わんちゃんあとで再利用するかもぐらいのもの
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
