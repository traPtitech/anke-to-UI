import { createDirectStore } from 'direct-vuex'
import apis, { User } from '/@/lib/apis'
const { store, rootActionContext } = createDirectStore({
  state: {
    count: 0,
    me: null as User | null
  },
  getters: {
    countString(state) {
      if (state.count === 0) return 'zero'
      if (state.count === 1) return 'once'
      return `${state.count} times`
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setMe(state, me: User) {
      state.me = me
    }
  },
  actions: {
    async fetchMe(context) {
      const { commit } = rootActionContext(context)

      const { data: me } = await apis.getMe()
      commit.setMe(me)
    }
  }
})

export default store.original

export type Store = typeof store
export const useStore = (): Store => store
