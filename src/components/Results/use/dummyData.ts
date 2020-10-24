import {
  ResponseResult,
  ResponseBodyQuestionTypeEnum,
  QuestionnaireByID,
  QuestionDetails,
  QuestionnaireByIDResSharedToEnum,
  QuestionDetailsQuestionTypeEnum
} from '../../../lib/apis'

type State = {
  information: QuestionnaireByID | null
  hasResponded: boolean
  canViewResults: boolean
  results: ResponseResult[]
  questions: string[]
  questionData: QuestionDetails[]
  detailTabs: string[]
}

export const results: ResponseResult[] = [
  {
    questionnaireID: 1,
    body: [
      {
        questionID: 1,
        question_type: ResponseBodyQuestionTypeEnum.TextArea,
        response: 'これはテストですか？',
        option_response: []
      },
      {
        questionID: 2,
        question_type: ResponseBodyQuestionTypeEnum.TextArea,
        response: 'これはテストです',
        option_response: []
      }
    ],
    modified_at: '1990/01/01 12:00',
    submitted_at: '1990/01/01 12:00',
    traqID: 'Forex'
  },
  {
    questionnaireID: 1,
    body: [
      {
        questionID: 1,
        question_type: ResponseBodyQuestionTypeEnum.TextArea,
        response: 'これはテストですか？',
        option_response: []
      },
      {
        questionID: 2,
        question_type: ResponseBodyQuestionTypeEnum.TextArea,
        response: 'これはテストです',
        option_response: []
      }
    ],
    modified_at: '1990/01/01 12:00',
    submitted_at: '1990/01/01 12:00',
    traqID: 'Ogrex'
  },
  {
    questionnaireID: 1,
    body: [
      {
        questionID: 1,
        question_type: ResponseBodyQuestionTypeEnum.TextArea,
        response: 'これはテストですか？',
        option_response: []
      },
      {
        questionID: 2,
        question_type: ResponseBodyQuestionTypeEnum.TextArea,
        response: 'これはテストです',
        option_response: []
      }
    ],
    modified_at: '1990/01/01 12:00',
    submitted_at: '1990/01/01 12:00',
    traqID: 'Emogrex'
  }
]

export const _dummy = (state: any, id: string, query: string): void => {
  state.information = {
    administrators: ['Fogrex'],
    created_at: '1990/01/01 12:00',
    description: 'テスト質問です。ダミー',
    modified_at: '1990/01/01 12:00',
    questionnaireID: 1,
    res_shared_to: QuestionnaireByIDResSharedToEnum.Public,
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
      questionnaireID: 1,
      page_num: 1,
      question_num: 1,
      question_type: QuestionDetailsQuestionTypeEnum.TextArea,
      body: '質問',
      is_required: true,
      options: [],
      scale_label_right: 'そう思わない',
      scale_label_left: 'そう思う',
      scale_min: 1,
      scale_max: 5,
      regex_pattern: '',
      min_bound: '',
      max_bound: '',
      questionID: 1,
      created_at: '1990/01/01 12:00'
    },
    {
      questionnaireID: 1,
      page_num: 1,
      question_num: 1,
      question_type: QuestionDetailsQuestionTypeEnum.TextArea,
      body: '言いたいこと',
      is_required: true,
      options: [],
      scale_label_right: 'そう思わない',
      scale_label_left: 'そう思う',
      scale_min: 1,
      scale_max: 5,
      regex_pattern: '',
      min_bound: '',
      max_bound: '',
      questionID: 1,
      created_at: '1990/01/01 12:00'
    }
  ]
  // console.log(results)
  // state.responseData = state.results[0]
  // const newBody: any = {}
  // results[0].body.forEach((data: ResponseBody) => {
  //   newBody[data.questionID] = data
  // })
  // state.responseData.body = newBody
}
