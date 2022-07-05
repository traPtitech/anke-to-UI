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
export type NewQuestionBase = {
  title: string
  isRequired: boolean
  key: number
}
export type NewTextQuestion = {
  questionType: QuestionType.Text | QuestionType.TextArea | QuestionType.Number
} & NewQuestionBase

export type NewLinearScaleQuestion = {
  questionType: QuestionType.LinearScale
  scaleMin: number
  scaleMax: number
  scaleLabelLeft: string
  scaleLabelRight: string
} & NewQuestionBase

export type NewCheckboxQuestion = {
  questionType: QuestionType.MultipleChoice | QuestionType.Checkbox
  options: string[]
} & NewQuestionBase

export type NewQuestionData =
  | NewTextQuestion
  | NewCheckboxQuestion
  | NewLinearScaleQuestion

const randomNumber = () => Math.random()

export const createNewQuestion = (type: QuestionType): NewQuestionData => {
  switch (type) {
    case QuestionType.Text: {
      return {
        questionType: QuestionType.Text,
        title: '',
        isRequired: false,
        key: randomNumber()
      }
    }
    case QuestionType.TextArea: {
      return {
        questionType: QuestionType.TextArea,
        title: '',
        isRequired: false,
        key: randomNumber()
      }
    }
    case QuestionType.Number: {
      return {
        questionType: QuestionType.Number,
        title: '',
        isRequired: false,
        key: randomNumber()
      }
    }
    case QuestionType.Checkbox: {
      return {
        questionType: QuestionType.Checkbox,
        title: '',
        isRequired: false,
        options: [],
        key: randomNumber()
      }
    }
    case QuestionType.MultipleChoice: {
      return {
        questionType: QuestionType.MultipleChoice,
        title: '',
        isRequired: false,
        options: [],
        key: randomNumber()
      }
    }
    case QuestionType.LinearScale: {
      return {
        questionType: QuestionType.LinearScale,
        title: '',
        isRequired: false,
        scaleMin: 0,
        scaleMax: 5,
        scaleLabelLeft: '',
        scaleLabelRight: '',
        key: randomNumber()
      }
    }
    default: {
      const throughType: never = type
      throw new Error(`型${throughType}は質問文の型にありません`)
    }
  }
}

export const findQuestionTypes = (type: string): QuestionType => {
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
