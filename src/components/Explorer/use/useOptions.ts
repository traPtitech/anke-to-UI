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
    opt: false
  },
  {
    str: '対象外のもののみ',
    opt: true
  }
]

export interface DropdownSortOrders {
  str: string
  opt: string
}
export interface DropdownTargetedOptions {
  str: string
  opt: boolean
}

export const getTimeLimit = (limit: string | null): string => {
  if (limit === null) {
    return 'なし'
  }
  const limitDate = new Date(limit)
  return (
    limitDate.getFullYear() +
    '/' +
    limitDate.getMonth() +
    '/' +
    limitDate.getDate() +
    ' ' +
    limitDate.getHours() +
    ':' +
    limitDate.getMinutes()
  )
}

export const getRelativeTime = (previous: string): string => {
  const now = new Date()
  const prv = new Date(previous)

  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30.4
  const year = day * 365

  const secondsDifference = (now.getTime() - prv.getTime()) / 1000

  if (secondsDifference < minute) {
    return Math.round(secondsDifference).toString() + '秒前'
  } else if (secondsDifference < hour) {
    return Math.round(secondsDifference / minute).toString() + '分前'
  } else if (secondsDifference < day) {
    return Math.round(secondsDifference / hour).toString() + '時間前'
  } else if (secondsDifference < month) {
    return Math.round(secondsDifference / day).toString() + '日前'
  } else if (secondsDifference < year) {
    return Math.round(secondsDifference / month).toString() + 'ヶ月前'
  }
  return Math.round(secondsDifference / year).toString() + '年前'
}
