import { computed, reactive, ToRefs, toRefs } from 'vue'
import { useStore } from '/@/store'
import { Me } from '/@/lib/apis'

// meがnullのときは呼ばれない仮定
const useMe = (): ToRefs<Me> => {
  const store = useStore()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const me = computed(() => store.state.me!)
  return toRefs(reactive(me.value))
}

export default useMe
