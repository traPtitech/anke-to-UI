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

export const adjustQuestions<T>(
  questionType:T,
  questionnaire: QuestionnaireByID,
  results: ResponseResult[],
  questions: QuestionDetails[]
): T => {
  /**この関数でやりたいこと
   * (i)questionがTextType , TextAreaType , MultipleChoice, …のどれかであるかを確認したいので引数にquestionTypeをうけとる
   * questionTypeはインターフェースと同じ名前にしたいex TextType , TextAreaType , MultipleChoice, …
   * (ii)それに応じたインターフェースを返すので返り値の型をTにする
   * 
   * ここのコメントアウトの部分ですることはT型の変数を用意してそれに必要な要素のみ代入していく…←可能？
   * イメージは↓　なんですが、６つのquestionTypeでそれぞれif分作っていちいち代入するのがめんどくさすぎて自分のイメージ違うんだろうなぁ…と思ってます
   * if(questionType == TextType)
   * {
   *     返り値.type = 'TextType'
   *     返り値.question = ？　←一番上のSelectTypeQuestionっていうのが何者かわかっていないです
   * }
   */
  return questionType;//←うそ（ただエラー気持ち悪かったのでとりあえずの値）
  //ほんとは、questionTypeに見合ったインターフェース（一番上のinterface TextTypeみたいな）をかえす;
}
