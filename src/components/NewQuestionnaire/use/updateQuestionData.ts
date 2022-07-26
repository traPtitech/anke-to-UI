import { SetupContext } from 'vue'
import { NewQuestionData } from './utils'

export const updateQuestionData =
  <T extends NewQuestionData>(
    props: {
      questionData: T
    },
    context: SetupContext<{
      update: (question: T) => true
    }>
  ) =>
  (key: keyof T, value: T[keyof T]): void => {
    const newData = { ...props.questionData }
    newData[key] = value
    context.emit('update', newData)
  }
