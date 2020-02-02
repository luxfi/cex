const values = [
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

const byIndex = i => values[i]
const byKey = k => values.find(v => v.key === k)

export default {
  values,
  byIndex,
  byKey
}
