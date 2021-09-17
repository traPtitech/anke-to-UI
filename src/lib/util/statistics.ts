/*コメントのコピー
 
1でまとめたやつを加工する
quesionごとに加工する
lib/util/statistics.tsを作って書いていく
getQuestionareDetailの中で呼ばれて、resultとquestionを渡されて↓みたな返り値を返す
interface TextType {
  type: 'Text'
  question: SelectTypeQuestion (ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] (ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}
{ questionnare: {}, question: (TextType | TextAreaType | MultipleChoice | 他にも)[] }

*/

import {
  QuestionnaireByID,
  ResponseResult,
  QuestionDetails,
  QuestionnaireWithResultsQuestions
} from '/@/lib/apis'


export const adjustQuestions(
  questionnaire: QuestionnaireByID,
  results: ResponseResult[],
  questions: QuestionDetails[]
): QuestionUnion => {
  questions[].question_type 

  /**この関数でやりたいこと
   * (i)返り値の型が(TextType | TextAreaType | MultipleChoice | ...)のユニオン
   * 
   * どうせこのコードの実行時(=ブラウザで表示されるとき)は↓
   * どの型かはわからないので使うときは逐次返り値.typeが何かで判断します
   * 
   * ここの肝は返り値.typeのif文をくぐらせることでそこの中では↓
   * TypeScriptの型補完がちゃんと効いて、コード上でどんなプロパティをもつ型か↓
   * どのタイプの質問か (\"Text\", \"TextArea\", \"Number\", \"MultipleChoice\", \"Checkbox\", \"LinearScale\") 
   * が一意にわかることです
   */
  return QuestionUnion型のやつ;//←うそ（ただエラー気持ち悪かったのでとりあえずの値）
}

//まだやってないけどそれぞれの型をつくってく
//テキスト
export interface Text {
  type: 'Text'
  question: SelectTypeQuestion //ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] //ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}

//テキスト（長文）
export interface TextArea {
  type: 'TextArea'
  question: SelectTypeQuestion //ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] //ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}

//数値
export interface Number {
  type: 'Number'
  question: SelectTypeQuestion //ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] //ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}

//ラジオボタン
export interface MultipleChoice {
  type: 'MultipleChoice'
  question: SelectTypeQuestion //ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] //ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}

//チェックボックス
export interface Checkbox {
  type: 'Checkbox'
  question: SelectTypeQuestion //ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] //ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}

//メモリ
export interface LinearScale {
  type: 'LinearScale'
  question: SelectTypeQuestion //ただのQuestion型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  results: SelectTypeResult[] //ただのResponseResult型じゃなくてどのプロパティにちゃんと値が入っていると保証している型)
  submitted_at: string
  modified_at: string
  traqID: string
}
export interface QuestionUnion {
  questionnare: {} 
  question: (Text | TextArea | MultipleChoice | Number | Checkbox | LinearScale )[] 
}



/*

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


//それぞれの人の回答が一人ずつ入ってる、traqIDが違うだけであとは形は同じ
ResponseResult[]
[
  0: {
    body:[
      0: {questionID: 3268, question_type: "Checkbox", response: null, option_response: ["自部屋"]}
      1: {questionID: 3269, question_type: "Text", response: "", option_response: null}
      2: {questionID: 3270, question_type: "Checkbox", response: null, option_response: ["その他"]}
      3: {questionID: 3271, question_type: "Text", response: "椅子", option_response: null}
      4: {questionID: 3274, question_type: "TextArea", response: "月0", option_response: null}
      5: {questionID: 3272, question_type: "TextArea", response: "", option_response: null}
      6: {questionID: 3273, question_type: "TextArea", response: "環境のせいだよ", option_response: null}
    ]
    modified_at: "2021-09-07T01:16:19+09:00"
    responseID: 15641
    submitted_at: "2021-09-07T01:16:19+09:00"
    traqID: "SSlime"
    }
  1: {}
]

//それぞれの質問の詳細が入ってる
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
]  
*/