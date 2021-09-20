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
