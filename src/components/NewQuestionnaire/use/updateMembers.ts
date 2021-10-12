import { useStore } from '/@/store'

const store = useStore()

export const updateTargets = (
  pastMembers: string[],
  newMembers: string[]
): void => {
  const addingTargets = newMembers.filter(
    member => !pastMembers.includes(member)
  )
  const removingTargets = pastMembers.filter(
    member => !newMembers.includes(member)
  )
  store.commit.addNewQuestionnaireTargets(addingTargets)
  store.commit.removeNewQuestionnaireTargets(removingTargets)
}
export const updateAdministrators = (
  pastMembers: string[],
  newMembers: string[]
): void => {
  const addingAdministrators = newMembers.filter(
    member => !pastMembers.includes(member)
  )
  const removingAdministrators = pastMembers.filter(
    member => !newMembers.includes(member)
  )
  store.commit.addNewQuestionnaireAdministrators(addingAdministrators)
  store.commit.removeNewQuestionnaireAdministrators(removingAdministrators)
}
