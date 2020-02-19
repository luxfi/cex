const moment = require('moment')

const emptyArray = [...Array(7)]

module.exports = emptyArray.map((day, i) => {
  if (moment().add(i, 'days').calendar().includes('Today')) {
    return {
      formated: 'Today',
      isoFormat: moment().add(i, 'days').format(),
    }
  }
  if (moment().add(i, 'days').calendar().includes('Tomorrow')) {
    return {
      formated: 'Tomorrow',
      isoFormat: moment().add(i, 'days').format(),
    }
  }
  return {
    formated: moment().add(i, 'days').format('ddd, MMMM DD'),
    isoFormat: moment().add(i, 'days').format(),
  }
})
