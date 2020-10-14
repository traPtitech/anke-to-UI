import { Response } from '../../../lib/apis'

export const results: Response[] = [
  {
    modifiedAt: '1990/01/01 12:00',
    responseId: 1,
    responseBody: [
      {
        option_response: [],
        questionID: 1,
        question_type: 'TextArea',
        response: 'これはテストですか？'
      },
      {
        option_response: [],
        questionID: 2,
        question_type: 'TextArea',
        response: 'これはテストです'
      }
    ],
    submittedAt: '1990/01/01 12:00',
    traqId: 'Fogrex'
  },
  {
    modifiedAt: '1990/01/01 12:00',
    responseId: 2,
    responseBody: [
      {
        option_response: [],
        questionID: 1,
        question_type: 'TextArea',
        response: 'これはテストですか？'
      },
      {
        option_response: [],
        questionID: 2,
        question_type: 'TextArea',
        response: 'これはテストです'
      }
    ],
    submittedAt: '1990/01/01 12:00',
    traqId: 'Ogrex'
  },
  {
    modifiedAt: '1990/01/01 12:00',
    responseId: 3,
    responseBody: [
      {
        option_response: [],
        questionID: 1,
        question_type: 'TextArea',
        response: 'これはテストですか？'
      },
      {
        option_response: [],
        questionID: 2,
        question_type: 'TextArea',
        response: 'これはテストです'
      }
    ],
    submittedAt: '1990/01/01 12:00',
    traqId: 'Xergof'
  }
]

export const _dummy = (state: any, id: string, query: string): void => {
  state.information = {
    administrators: ['Fogrex'],
    created_at: '1990/01/01 12:00',
    description: 'テスト質問です。ダミー',
    modified_at: '1990/01/01 12:00',
    questionnaireID: 1,
    res_shared_to: 'public',
    res_time_limit: 'NULL',
    respondents: ['Fogrex', 'Ogrex', 'Xergof'],
    targets: [],
    title: 'テスト質問'
  }
  state.hasResponded = true
  state.canViewResults = false
  state.results = results
  state.questions = ['質問', '言いたいこと']
  state.questionData = [
    {
      questionId: 1,
      type: 'TextArea',
      component: 'short-answer',
      questionBody: '質問',
      isRequired: true,
      pageNum: 1,
      responseBody: ''
    },
    {
      questionId: 2,
      type: 'TextArea',
      component: 'short-answer',
      questionBody: '言いたいこと',
      isRequired: true,
      pageNum: 1,
      responseBody: ''
    }
  ]
  state.responseData = state.results[0]
  let newBody: any = {}
  state.responseData.responseBody.forEach((data: any) => {
    newBody[data.questionID] = data
  })
  state.responseData.body = newBody
}
