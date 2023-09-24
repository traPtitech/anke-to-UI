import { onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

const useBreakpoint = (breakpoint: string) => {
  const mql = window.matchMedia(`(min-width: ${breakpoint}px)`)

  const isSmaller = ref(!mql.matches)

  const onChange = (e: MediaQueryListEvent) => {
    isSmaller.value = !e.matches
  }

  mql.addEventListener('change', onChange)
  onUnmounted(() => {
    mql.removeEventListener('change', onChange)
  })

  return { isSmaller }
}

export default useBreakpoint
