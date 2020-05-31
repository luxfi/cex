const STATUSES = [
  {
    index: 0,
    key: 'all',
    title: 'All Films'
  },
  {
    index: 1,
    key: 'funding',
    title: 'Now Funding'
  },
  {
    index: 2,
    key: 'trading',
    title: 'Now Trading'
  },
]

const byIndex = i => STATUSES[i]
const byKey = k => STATUSES.find(v => v.key === k)

export default {
  STATUSES,
  byIndex,
  byKey
}
