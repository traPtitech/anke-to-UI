import { adjustDigits } from '/@/lib/util/number'

export const sortOrders = [
  '最近更新された',
  '最近更新されていない',
  'タイトル順',
  'タイトル逆順',
  '最新',
  '最も古い'
]
export const targetedOptions = ['全て', '対象外のもののみ']

export const stringToOption = (str: string): string => {
  switch (str) {
    case '最近更新された':
      return '-modified_at'
    case '最近更新されていない':
      return 'modified_at'
    case 'タイトル順':
      return 'title'
    case 'タイトル逆順':
      return '-title'
    case '最新':
      return '-created_at'
    case '最も古い':
      return 'created_at'
    case '全て':
      return 'false'
    case '対象外のもののみ':
      return 'true'
    default:
      return ''
  }
}

const SortOrders = {
  ModifiedLatest: '-modified_at',
  ModifiedOldest: 'modified_at',
  TitleOrder: 'title',
  TitleReverseOrder: '-title',
  CreatedLatest: '-created_at',
  CreatedOldest: 'created_at'
} as const
export type SortOrder = typeof SortOrders[keyof typeof SortOrders]

export type TargetedOption = `${boolean}`

export interface Option {
  sort: string
  page: number
  nontargeted: string
}

export const getTimeLimit = (limit: string | null): string => {
  if (limit === null) {
    return 'なし'
  }
  const limitDate = new Date(limit)
  return `${limitDate.getFullYear()}/${adjustDigits(
    limitDate.getMonth() + 1
  )}/${adjustDigits(limitDate.getDate())} ${adjustDigits(
    limitDate.getHours()
  )}:${adjustDigits(limitDate.getMinutes())}`
}

export const getRelativeTime = (previous: string): string => {
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
