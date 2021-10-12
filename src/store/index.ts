import { createDirectStore } from 'direct-vuex'
import apis, { Me } from '/@/lib/apis'
import { NewQuestionnaire, NewQuestionnaireResSharedToEnum } from '/@/lib/apis'

const getDefaultNewQuestionnaire = (): NewQuestionnaire => {
  return {
    title: '',
    description: '',
    res_time_limit: '',
    res_shared_to: NewQuestionnaireResSharedToEnum.Public,
    targets: [],
    administrators: [],
  }
}

const { store, rootActionContext } = createDirectStore({
  state: {
    me: null as Me | null,
    newQuestionnaire: getDefaultNewQuestionnaire()
  },
  getters: {},
  mutations: {
    setMe(state, me: Me) {
      state.me = me
    },
    setNewQuestionnaire(state, newQuestionnaire: NewQuestionnaire) {
      state.newQuestionnaire = newQuestionnaire
    },
    setNewQuestionnaireResSharedTo(
      state,
      resSharedTo: NewQuestionnaireResSharedToEnum
    ) {
      state.newQuestionnaire.res_shared_to = resSharedTo
    },
    addNewQuestionnaireTargets(state, targets: string[]) {
      state.newQuestionnaire.targets = [
        ...new Set(state.newQuestionnaire.targets.concat(targets))
      ]
    },
    removeNewQuestionnaireTargets(state, targets: string[]) {
      state.newQuestionnaire.targets = state.newQuestionnaire.targets.filter(
        t => !targets.includes(t)
      )
    },
    addNewQuestionnaireAdministrators(state, administrators: string[]) {
      state.newQuestionnaire.administrators = [
        ...new Set(state.newQuestionnaire.administrators.concat(administrators))
      ]
    },
    removeNewQuestionnaireAdministrators(state, administrators: string[]) {
      state.newQuestionnaire.administrators =
        state.newQuestionnaire.administrators.filter(
          t => !administrators.includes(t)
        )
    },
    clearNewQuestionnaire(state) {
      state.newQuestionnaire = getDefaultNewQuestionnaire()
    }
  },
  actions: {
    async fetchMe(context) {
      const { commit } = rootActionContext(context)

      const { data: me } = await apis.getUsersMe()
      commit.setMe(me)
    }
  }
})

export default store.original

export type Store = typeof store
export const useStore = (): Store => store
