import { QuestionType } from '/@/lib/apis'

export type DetailTabTypes = 'information' | 'questions'
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

export interface QuestionLite {
  type: QuestionType
  name: string
  required: boolean
  isNumber?: boolean
  contents?: string[]
  range?: number[]
  leftLabel?: string
  rightLabel?: string
}

// question types
export interface TextQuestion {
  type: QuestionType
  name: string
  required: boolean
  isNumber: boolean
}

export interface LinearScaleQuestion {
  type: QuestionType
  name: string
  required: boolean
  range: [min: number, max: number]
  leftLabel: string
  rightLabel: string
}

export interface CheckboxQuestion {
  type: QuestionType
  name: string
  required: boolean
  contents: string[]
}

export type QuestionData = TextQuestion | CheckboxQuestion | LinearScaleQuestion

export const createNewQuestion = (type: string): QuestionData | null => {
  switch (type) {
    case 'Text': {
      return {
        type: QuestionType.Text,
        name: '',
        required: false,
        isNumber: false
      }
    }
    case 'TextArea': {
      return {
        type: QuestionType.TextArea,
        name: '',
        required: false,
        isNumber: false
      }
    }
    case 'Number': {
      return {
        type: QuestionType.Number,
        name: '',
        required: false,
        isNumber: true
      }
    }
    case 'Checkbox': {
      return {
        type: QuestionType.Checkbox,
        name: '',
        required: false,
        contents: ['']
      }
    }
    case 'MultipleChoice': {
      return {
        type: QuestionType.MultipleChoice,
        name: '',
        required: false,
        contents: ['']
      }
    }
    case 'LinearScale': {
      return {
        type: QuestionType.LinearScale,
        name: '',
        required: false,
        range: [1, 5],
        leftLabel: '',
        rightLabel: ''
      }
    }
    default: {
      throw new Error(`型${type}は質問文の型にありません`)
    }
  }
}
