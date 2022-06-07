import { ResShareType } from '/@/lib/apis'

export const disclosureRange = {
  public: {
    value: ResShareType.Public,
    label: '全体'
  },
  respondents: {
    value: ResShareType.Respondents,
    label: '回答済みの人'
  },
  administrators: {
    value: ResShareType.Administrators,
    label: '管理者のみ'
  }
}

export const labelToValue = (label: string): ResShareType => {
  return Object.values(disclosureRange).find(item => item.label === label)
    ?.value as ResShareType
}
