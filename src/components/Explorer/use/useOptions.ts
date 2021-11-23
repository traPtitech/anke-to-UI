import { adjustDigits } from '/@/lib/util/number'
import { SortType } from '/@/lib/apis'

export const sortOrderMap: [string, SortType][] = [
  ['最近更新された', SortType.CreatedAtDESC],
  ['最近更新されていない', SortType.ModifiedAtASC],
  ['タイトル順', SortType.TitleASC],
  ['タイトル逆順', SortType.TitleDESC],
  ['最新', SortType.CreatedAtDESC],
  ['最も古い', SortType.CreatedAtASC]
]
export const targetedOptionMap: [string, TargetedOption][] = [
  ['全て', 'true'],
  ['対象外のもののみ', 'false']
]

export const stringToOption = <T>(str: string, map: Map<string, T>): T => {
  const option = map.get(str)
  if (!option) {
    throw 'invalid key'
  }
  return option
}

type TargetedOption = `${boolean}`

export interface Option {
  sort: SortType
  page: number
  nontargeted: TargetedOption
}

export const getTimeLimit = (limit: string | null | undefined): string => {
  if (!limit) {
    return 'なし'
  }
  const limitDate = new Date(limit)
  return `${limitDate.getFullYear()}/${adjustDigits(
    limitDate.getMonth() + 1
  )}/${adjustDigits(limitDate.getDate())} ${adjustDigits(
    limitDate.getHours()
  )}:${adjustDigits(limitDate.getMinutes())}`
}

export const getRelativeTime = (previous: string | undefined): string => {
  if (!previous) {
    return '未提出'
  }
  const now = new Date()
  const prv = new Date(previous)

  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const MONTH = DAY * 30.4
  const YEAR = DAY * 365

  const secondsDifference = (now.getTime() - prv.getTime()) / 1000

  if (secondsDifference < MINUTE) {
    return `${Math.floor(secondsDifference)}秒前`
  } else if (secondsDifference < HOUR) {
    return `${Math.floor(secondsDifference / MINUTE)}分前`
  } else if (secondsDifference < DAY) {
    return `${Math.floor(secondsDifference / HOUR)}時間前`
  } else if (secondsDifference < MONTH) {
    return `${Math.floor(secondsDifference / DAY)}日前`
  } else if (secondsDifference < YEAR) {
    return `${Math.floor(secondsDifference / MONTH)}ヶ月前`
  } else {
    return `${Math.floor(secondsDifference / YEAR)}年前`
  }
}
