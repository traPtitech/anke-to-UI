/**
 * 1桁だったら前に0を付け足す
 * @param num 数字
 */
export const adjustDigits = (num: number): string => {
  return num.toString().padStart(2, '0')
}
