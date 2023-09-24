import useBreakpoint from '/@/use/useBreakpoint'

const useIsTablet = () => {
  const { isSmaller: IsTablet } = useBreakpoint('1023')
  return { IsTablet }
}

export default useIsTablet
