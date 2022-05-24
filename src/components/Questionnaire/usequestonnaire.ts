export const InformationTabName = 'Information'
export const QuestionsTabName = 'Questions'
export type DetailTabTypesQuestionnaire = 'Information' | 'Questions'
export const detailTabsQuestionnaire: DetailTabTypesQuestionnaire[] = [
  InformationTabName,
  QuestionsTabName
]
export type questionrangedetail = { [key: number]: number[] }
