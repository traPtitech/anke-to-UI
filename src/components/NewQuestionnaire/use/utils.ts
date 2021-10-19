import { QuestionType } from '/@/lib/apis'

export type NewQuestionnaireTabTypes = 'information' | 'questions'
export const detailTabs = ['information', 'questions']
export const questionTypes = {
  Text: {
    type: 'Text',
    label: 'テキスト',
    component: 'short-answer'
  },
  TextArea: {
    type: 'TextArea',
    label: 'テキスト（長文）',
    component: 'short-answer'
  },
  Number: {
    type: 'Number',
    label: '数値',
    component: 'short-answer'
  },
  Checkbox: {
    type: 'Checkbox',
    label: 'チェックボックス',
    component: 'multiple-choice'
  },
  MultipleChoice: {
    type: 'MultipleChoSice',
    label: 'ラジオボタン',
    component: 'multiple-choice'
  },
  LinearScale: {
    type: 'LinearScale',
    label: '目盛り',
    component: 'linear-scale'
  }
}

// question types
export interface TextQuestion {
  question_type: QuestionType
  body: string
  is_required: boolean
}

export interface LinearScaleQuestion {
  question_type: QuestionType
  body: string
  is_required: boolean
  scale_min: number
  scale_max: number
  scale_label_left: string
  scale_label_right: string
}

export interface CheckboxQuestion {
  question_type: QuestionType
  body: string
  is_required: boolean
  options: string[]
}

export type QuestionData = TextQuestion | CheckboxQuestion | LinearScaleQuestion

export const createNewQuestion = (type: string): QuestionData | null => {
  switch (type) {
    case 'Text': {
      return {
        question_type: QuestionType.Text,
        body: '',
        is_required: false
      }
    }
    case 'TextArea': {
      return {
        question_type: QuestionType.TextArea,
        body: '',
        is_required: false
      }
    }
    case 'Number': {
      return {
        question_type: QuestionType.Number,
        body: '',
        is_required: false
      }
    }
    case 'Checkbox': {
      return {
        question_type: QuestionType.Checkbox,
        body: '',
        is_required: false,
        options: ['']
      }
    }
    case 'MultipleChoice': {
      return {
        question_type: QuestionType.MultipleChoice,
        body: '',
        is_required: false,
        options: ['']
      }
    }
    case 'LinearScale': {
      return {
        question_type: QuestionType.LinearScale,
        body: '',
        is_required: false,
        scale_min: 0,
        scale_max: 5,
        scale_label_left: '',
        scale_label_right: ''
      }
    }
    default: {
      throw new Error(`型${type}は質問文の型にありません`)
    }
  }
}
