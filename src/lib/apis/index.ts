// eslint-disable-next-line no-restricted-imports
import { Apis } from '/@/lib/apis/generated'
//import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
import { adjustQuestions, QuestionUnion } from '../util/statistics'
const apis = new Apis({ basePath: '/api' })

export default apis
// eslint-disable-next-line no-restricted-imports
export * from '/@/lib/apis/generated'

export const traP_ID = 1
/*
export type QuestionnaireWithResultsQuestions = {
  questionnaire: QuestionnaireByID
  results: ResponseResult[]
  questions: QuestionDetails[]
}
*/
//編集用
export const getQuestionnaireDetail = async (
  questionnaireId: number
): Promise<QuestionUnion> => {
  //let QRQ: QuestionnaireWithResultsQuestions
  const [qres, rres, qsres] = await Promise.all([
    apis.getQuestionnaire(questionnaireId),
    apis.getResults(questionnaireId),
    apis.getQuestions(questionnaireId)
  ])
  //adjustQuestionsにqres, rres, qsresたちをわたしてきっちりした型に修正、それをreturnしたい
  return adjustQuestions(qres.data, rres.data, qsres.data)
}
