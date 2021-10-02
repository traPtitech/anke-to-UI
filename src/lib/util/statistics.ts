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
  resQuestions.forEach(function (array) {
    if (isValidTypeQuestion(array)) {
      validTypeQuestion.push(array)
    }
  })
  return {
    questionnaire: questionnaire,
    questions: validTypeQuestion
  }
}

//テキスト
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
  > &
    QuestionDetails
  results: StringResult
}

//テキスト（長文）
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
  > &
    QuestionDetails
  results: StringResult
}

//数値
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
  > &
    QuestionDetails
  results: StringResult
}

//ラジオボタン
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
  > &
    QuestionDetails
  results: ArrayResult
}

//チェックボックス
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
  > &
    QuestionDetails
  results: ArrayResult
}

//メモリ
export interface LinearScaleTypeQuestion {
  type: 'LinearScale'
  question: Omit<
    QuestionDetails,
    'questionnaireID' | 'max_bound' | 'min_bound' | 'options' | 'regex_pattern'
  > &
    QuestionDetails
  results: StringResult
}

//一つの質問、一人あたりの
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
  question: QuestionDetails
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

export type StringResult = (Omit<
  ResonsePerQuestionWithUser,
  'option_response'
> & { response: string })[]

export type ArrayResult = (Omit<ResonsePerQuestionWithUser, 'response'> & {
  option_response: string
})[]

/*以下はアンケートからとってきたものとapi.tsで定義されている型とをくらべてる。
QuestionnaireByID, ResponseResult[], QuestionDetails[]の順で。

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//誰によって、対象、回答者などアンケートについて書かれている
QuestionnaireByID

administrators: ["Ras"]
created_at: "2021-09-07T00:25:09+09:00"
description: "紙の技術本がどうしても読めません、かといって小説も読めません\n環境のせいにしたいのであなたの読書環境を教えてください"
modified_at: "2021-09-07T00:25:55+09:00"
questionnaireID: 972
res_shared_to: "public"
res_time_limit: null
respondents: ["SSlime", "Ras", "tenya", "Komichi", "hijiki51", "kegra", "Kamijo", "reyu", "xxpoxx", "xxarupakaxx",…]
targets: []
title: "読書環境を教えてください"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//それぞれの人の回答が一人ずつ入ってる、traqIDが違うだけであとは形は同じ
ResponseResult[]

[
  0: {
    body:[
      0: {questionID: 2944, question_type: "LinearScale", response: "5", option_response: null}
      0: {questionID: 28, question_type: "Number", response: "93", option_response: null}
      2: {questionID: 3270, question_type: "Checkbox", response: null, option_response: ["その他"]}
      3 :{questionID: 3291, question_type: "MultipleChoice", response: null, option_response: ["ほぼ毎日食べてる"]}
      1: {questionID: 3269, question_type: "Text", response: "", option_response: null}
      3: {questionID: 3271, question_type: "Text", response: "椅子", option_response: null}
      4: {questionID: 3274, question_type: "TextArea", response: "月0", option_response: null}
      5: {questionID: 3272, question_type: "TextArea", response: "", option_response: null}
      
    ]
    modified_at: "2021-09-07T01:16:19+09:00"
    responseID: 15641
    submitted_at: "2021-09-07T01:16:19+09:00"
    traqID: "SSlime"
    }
]

//---------------------------------------------------------------------------

resultsPerQuestion（…RPQ）

[
  [questionID: 3268, question_type: "Checkbox", response: null, option_response: ["自部屋"],modified_at:,submitted_at:,traqID:],
  [questionID: 3268, question_type: "Checkbox", response: null, option_response: ["その他"],modified_at:,submitted_at:,traqID:],
  [questionID: 3268, question_type: "Checkbox", response: null, option_response: ["自部屋"],modified_at:,submitted_at:,traqID:],
  [questionID: 3268, question_type: "Checkbox", response: null, option_response: ["自部屋"],modified_at:,submitted_at:,traqID:]
]

//---------------------------------------------------------------------------

/////////////////api,ts//////////////////

export interface ResponseResult {
  questionnaireID: number
  body: Array<ResponseBody>
  submitted_at: string
  modified_at: string
  traqID: string
}
export interface ResponseBody {
  questionID: number
  question_type: QuestionType
  response?: string
  option_response?: Array<string>
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//それぞれの質問の詳細が入ってる
とりあえず六種類をべつのアンケートからとってきたけど、numberが探せてない状況
QuestionDetails[]

[
0: {
body: "場所"
created_at: "2021-09-07T00:25:09+09:00"
is_required: false
max_bound: ""
min_bound: ""
options: [
  0: "自部屋"
  1: "リビング"
  2: "図書館"
  3: "その他"
]
page_num: 1
questionID: 3268
question_num: 0
question_type: "Checkbox"
regex_pattern: ""
scale_label_left: ""
scale_label_right: ""
scale_max: 0
scale_min: 0
}

3:{ 
body: "その他 > 何ですか"
created_at: "2021-09-07T00:25:09+09:00"
is_required: false
max_bound: ""
min_bound: ""
options: []
page_num: 1
questionID: 3271
question_num: 3
question_type: "Text"
regex_pattern: ""
scale_label_left: ""
scale_label_right: ""
scale_max: 0
scale_min: 0
}

4: {
body: "ペース 週一とか"
created_at: "2021-09-07T00:25:56+09:00"
is_required: false
max_bound: ""
min_bound: ""
options: []
page_num: 1
questionID: 3274
question_num: 4
question_type: "TextArea"
regex_pattern: ""
scale_label_left: ""
scale_label_right: ""
scale_max: 0
scale_min: 0
}

0: {
body: "朝ごはんを"
created_at: "2021-09-14T05:11:22+09:00"
is_required: true
max_bound: ""
min_bound: ""
options: ["ほぼ毎日食べてる", "ちょくちょく食べてる", "食べない"]
page_num: 1
questionID: 3291
question_num: 0
question_type: "MultipleChoice"
regex_pattern: ""
scale_label_left: ""
scale_label_right: ""
scale_max: 0
scale_min: 0
}

0: {
body: "分かりやすさ"
created_at: "2021-05-22T17:03:23+09:00"
is_required: true
max_bound: ""
min_bound: ""
options: []
page_num: 1
questionID: 2944
question_num: 0
question_type: "LinearScale"
regex_pattern: ""
scale_label_left: "分かりにくい"
scale_label_right: "分かりやすい"
scale_max: 5
scale_min: 1
}

0: {
body: "100以下の好きな整数を書いてください。2番目に大きい数を書いた人が勝ちです。"
created_at: "2019-03-30T02:13:30+09:00"
is_required: true
max_bound: ""
min_bound: ""
options: []
page_num: 1
questionID: 28
question_num: 0
question_type: "Number"
regex_pattern: ""
scale_label_left: ""
scale_label_right: ""
scale_max: 0
scale_min: 0
}
]

/////////////////api,ts//////////////////

export interface QuestionDetails {
   questionnaireID: number
   /page_num: number
   /question_num: number
   /question_type: QuestionType
   /body: string
   /is_required: boolean
   /options: Array<string>
   /scale_label_right: string
   /scale_label_left: string
   /scale_min: number
   /scale_max: number
   /regex_pattern: string
   /min_bound: string
   /max_bound: string
   /questionID: number
   /created_at: string
 }

*/
