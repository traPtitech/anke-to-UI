import { QuestionType } from '/@/lib/apis'

export const NewInformationTabName = 'Information'
export const NewQuestionsTabName = 'Questions'
export type NewQuestionnaireTabTypes = 'Information' | 'Questions'
export const detailTabs: NewQuestionnaireTabTypes[] = [
  NewInformationTabName,
  NewQuestionsTabName
]
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
    type: 'MultipleChoice',
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
export type TextQuestion = {
  question_type: QuestionType
  body: string
  is_required: boolean
}

export type LinearScaleQuestion = {
  question_type: QuestionType
  body: string
  is_required: boolean
  scale_min: number
  scale_max: number
  scale_label_left: string
  scale_label_right: string
}

export type CheckboxQuestion = {
  question_type: QuestionType
  body: string
  is_required: boolean
  options: string[]
}

export type QuestionData = TextQuestion | CheckboxQuestion | LinearScaleQuestion

export const createNewQuestion = (type: QuestionType): QuestionData => {
  switch (type) {
    case QuestionType.Text: {
      return {
        question_type: QuestionType.Text,
        body: '',
        is_required: false
      }
    }
    case QuestionType.TextArea: {
      return {
        question_type: QuestionType.TextArea,
        body: '',
        is_required: false
      }
    }
    case QuestionType.Number: {
      return {
        question_type: QuestionType.Number,
        body: '',
        is_required: false
      }
    }
    case QuestionType.Checkbox: {
      return {
        question_type: QuestionType.Checkbox,
        body: '',
        is_required: false,
        options: ['']
      }
    }
    case QuestionType.MultipleChoice: {
      return {
        question_type: QuestionType.MultipleChoice,
        body: '',
        is_required: false,
        options: ['']
      }
    }
    case QuestionType.LinearScale: {
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
      const throughType: never = type
      throw new Error(`型${throughType}は質問文の型にありません`)
    }
  }
}

export const findQuestionTypes = (type: string) => {
  switch (type) {
    case questionTypes.Text.label: {
      return QuestionType.Text
    }
    case questionTypes.TextArea.label: {
      return QuestionType.TextArea
    }
    case questionTypes.Number.label: {
      return QuestionType.Number
    }
    case questionTypes.Checkbox.label: {
      return QuestionType.Checkbox
    }
    case questionTypes.MultipleChoice.label: {
      return QuestionType.MultipleChoice
    }
    case questionTypes.LinearScale.label: {
      return QuestionType.LinearScale
    }
    default: {
      throw new Error(`型${type}は質問の型にありません`)
    }
  }
}
