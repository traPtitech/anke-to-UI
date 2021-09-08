import { createDirectStore } from 'direct-vuex'
import apis, { Me } from '/@/lib/apis'
const { store, rootActionContext } = createDirectStore({
  state: {
    me: null as Me | null
  },
  getters: {},
  mutations: {
    setMe(state, me: Me) {
      state.me = me
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
