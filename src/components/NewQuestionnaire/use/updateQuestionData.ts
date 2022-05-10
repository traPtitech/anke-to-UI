import { SetupContext } from 'vue'
import { QuestionData } from './utils'

export const updateQuestionData =
  <T extends QuestionData>(
    props: {
      questionData: T
      index: number
    },
    context: SetupContext<{
      update: (question: T, index: number) => true
    }>
  ) =>
  (key: keyof T, value: T[keyof T]): void => {
    const newData = { ...props.questionData }
    newData[key] = value
    context.emit('update', newData, props.index)
  }
