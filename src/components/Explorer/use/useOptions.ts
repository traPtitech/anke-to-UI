import { adjustDigits } from '/@/lib/util/number'

export const sortOrders = [
  {
    str: '最近更新された',
    opt: '-modified_at'
  },
  {
    str: '最近更新されていない',
    opt: 'modified_at'
  },
  {
    str: 'タイトル順',
    opt: 'title'
  },
  {
    str: 'タイトル逆順',
    opt: '-title'
  },
  {
    str: '最新',
    opt: '-created_at'
  },
  {
    str: '最も古い',
    opt: 'created_at'
  }
]
export const targetedOptions = [
  {
    str: '全て',
    opt: 'false'
  },
  {
    str: '対象外のもののみ',
    opt: 'true'
  }
]

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

export interface DropdownSortOrders {
  str: string
  opt: SortOrder
}
export interface DropdownTargetedOptions {
  str: string
  opt: `${boolean}`
}

export interface Option {
  sort: string
  page: number
  nontargeted: boolean
}

export const changeOption = (
  option: Option,
  newOption: SortOrder | TargetedOption
): Option => {
  const opt = option
  if (targetedOptions.some(param => param.opt === newOption)) {
    opt.nontargeted = newOption === 'true'
  } else {
    opt.sort = newOption
  }
  return opt
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
