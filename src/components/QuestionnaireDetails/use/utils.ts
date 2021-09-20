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
  type?: QuestionType
  isNumber?: boolean
  contents?: string[]
  modelValue?: string[] | string
  range?: number[]
  leftLabel?: string
  rightLabel?: string
}

export const createNewQuestion = (type: string): QuestionLite => {
  switch (type) {
    case 'Text': {
      return {
        type: QuestionType.Text,
        isNumber: false,
        modelValue: ''
      }
    }
    case 'TextArea': {
      return {
        type: QuestionType.TextArea,
        modelValue: ''
      }
    }
    case 'Number': {
      return {
        type: QuestionType.Number,
        isNumber: true,
        modelValue: '0'
      }
    }
    case 'Checkbox': {
      return {
        type: QuestionType.Checkbox,
        contents: [''],
        modelValue: []
      }
    }
    case 'MultipleChoice': {
      return {
        type: QuestionType.MultipleChoice,
        contents: [''],
        modelValue: ''
      }
    }
    case 'LinerScale': {
      return {
        type: QuestionType.LinearScale,
        range: [1, 5],
        leftLabel: '',
        rightLabel: ''
      }
    }
    default: {
      console.error(`型${type}は質問文の型にありません`)
      return {};
    }
  }
}
