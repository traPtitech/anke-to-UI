/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
  (key: keyof T, value: T[keyof T]) => {
    const newData = { ...props.questionData }
    newData[key] = value
    context.emit('update', newData, props.index)
  }
