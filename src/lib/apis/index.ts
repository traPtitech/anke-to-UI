// eslint-disable-next-line no-restricted-imports
import { Apis } from '/@/lib/apis/generated'
import {
  associateQuestionToResultFromRawData,
  ResultsPerQuestion
} from '/@/components/Results/use/statistics'
const apis = new Apis({ basePath: '/api' })

export default apis
// eslint-disable-next-line no-restricted-imports
export * from '/@/lib/apis/generated'

export const traP_ID = 1

export const getResultsPerQuestion = async (
  questionnaireId: number
): Promise<ResultsPerQuestion> => {
  const [qres, qsres, rres] = await Promise.all([
    apis.getQuestionnaire(questionnaireId),
    apis.getQuestions(questionnaireId),
    apis.getResults(questionnaireId)
  ])
  return associateQuestionToResultFromRawData(qres.data, qsres.data, rres.data)
}
