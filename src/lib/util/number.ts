/**
 * 1桁だったら前に0を付け足す
 * @param num 数字
 */
export const adjustDigits = (num: number): string => {
  if (num.toString().length === 1) {
    return `0${num}`
  } else {
    return `${num}`
  }
}
