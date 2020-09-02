export default {
  sortOrders: [
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
  ],
  targetedOptions: [
    {
      str: '全て',
      opt: false
    },
    {
      str: '対象外のもののみ',
      opt: true
    }
  ]
}
