import useBreakpoint from '/@/use/useBreakpoint'

const useIsMobile = () => {
  const { isSmaller: isMobile } = useBreakpoint('599')
  return { isMobile }
}

export default useIsMobile
