import { NewQuestionnaireResSharedToEnum } from '/@/lib/apis'

export const disclosureRange = {
  public: {
    value: NewQuestionnaireResSharedToEnum.Public,
    label: '全体'
  },
  respondents: {
    value: NewQuestionnaireResSharedToEnum.Respondents,
    label: '回答済みの人'
  },
  administrators: {
    value: NewQuestionnaireResSharedToEnum.Administrators,
    label: '管理者のみ'
  }
}
