import { ResponseBody, QuestionType, QuestionDetails } from '/@/lib/apis'

export const createResponse = (
  questionID: number,
  type: QuestionType
): ResponseBody => {
  return {
    questionID: questionID,
    question_type: type,
    response: '',
    option_response: []
  }
}

export const createResponses = (
  questioncontents: QuestionDetails[]
): ResponseBody[] => {
  const Responses: ResponseBody[] = []
  for (let i = 0; i < questioncontents.length; i++) {
    const questioncontent = questioncontents[i]
    const Response = createResponse(
      questioncontent.questionID,
      questioncontent.question_type
    )
    Responses.push(Response)
  }
  return Responses
}
