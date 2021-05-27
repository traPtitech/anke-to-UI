import {
  ResponseResult,
  ResponseBodyQuestionTypeEnum,
  QuestionnaireByID,
  QuestionDetails,
  QuestionnaireByIDResSharedToEnum,
  QuestionDetailsQuestionTypeEnum
} from '../../../lib/apis'
import { CountedData } from './utils'

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

export const information: QuestionnaireByID | null = {
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

export const hasResponded = true
export const canViewResults = false
export const questions: string[] = ['質問', '言いたいこと']
export const questionData: QuestionDetails[] = [
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

export const tableHeaders = ['traQID', '回答日時', '質問', '言いたいこと']
export const showColumn = [true, true, true, true]
export const tableWidth = 4
export const canDownload = true
export const countedData: CountedData[] = [
  {
    title: '質問',
    type: ResponseBodyQuestionTypeEnum.Checkbox,
    length: 2,
    total: {
      average: 0,
      standardDeviation: 0,
      median: 0,
      mode: 0
    },
    data: [
      ['そう思う', ['Fogrex']],
      ['そう思わない', ['Ogrex', 'Xergof']]
    ]
  }
]
export const markdownTable = ''
