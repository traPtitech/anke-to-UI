// eslint-disable-next-line no-restricted-imports
import { Apis } from '/@/lib/apis/generated'
import { QuestionnaireByID, ResponseResult, QuestionDetails } from '/@/lib/apis'
const apis = new Apis({ basePath: '/api' })

export default apis
// eslint-disable-next-line no-restricted-imports
export * from '/@/lib/apis/generated'

export const traP_ID = 1

type QuestionnaireResultQuestion = {
  questionnaire: QuestionnaireByID
  results: ResponseResult
  questions: QuestionDetails
}

export const getQuestionnaireDetail = async (): Promise<void> => {
  const questionnaireId = Number(route.params.id)
  if (isNaN(questionnaireId)) return
  let aQuestionnaireResultQuestion: QuestionnaireResultQuestion
  /*//↓これはなんかエラーだった
  [
    aQuestionnaireResultQuestion.questionnaire,
    aQuestionnaireResultQuestion.results,
    aQuestionnaireResultQuestion.questions
  ] = await Promise.all([
    apis.getQuestionnaire(questionnaireId, ''),
    apis.getResults(questionnaireId, ''),
    apis.getQuestions(questionnaireId, '')
  ])
  */
  const [qres, rres, qsres] = await Promise.all([
    apis.getQuestionnaire(questionnaireId, ''),
    apis.getResults(questionnaireId, ''),
    apis.getQuestions(questionnaireId, '')
  ])
  aQuestionnaireResultQuestion.questionnaire = qres.data
  aQuestionnaireResultQuestion.results = rres.data
  aQuestionnaireResultQuestion.questions = qsres.data
  return aQuestionnaireResultQuestion
}

//↓コメントのコピー
/*
onMounted(async () => {
  const questionnaireId = Number(route.params.id)
  if (isNaN(questionnaireId)) return
  const [qres, rres, qsres] = await Promise.all([
    apis.getQuestionnaire(questionnaireId, ''),
    apis.getResults(questionnaireId, ''),
    apis.getQuestions(questionnaireId, '')
  ])

  questionnaire.value = qres.data
  results.value = rres.data
  questions.value = qsres.data
})
*/
