const statuses = [
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

const byIndex = i => statuses[i]
const byKey = k => statuses.find(v => v.key === k)

export default {
  statuses,
  byIndex,
  byKey
}
