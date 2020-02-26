import moment from 'moment/moment.js'

export const formatNumber = (num, digits) => {
  if (num >= 1E6) {
    return `${(num / 1E6).toFixed(digits)}M`
  }

  if (num >= 1E3) {
    return `${(num / 1E3).toFixed(digits)}K`
  }

  return num
}

export const formatDuration = (time) => {
  const playTime = parseInt(time, 10)
  const minute = Math.floor(playTime / 60)
  const seconds = Math.floor(playTime - (minute * 60))
  return `${minute}:${seconds > 9 ? seconds : `0${seconds}`}`
}

export const calculateDateFrom = (date) => moment(date, 'YYYYMMDD').fromNow()

export const renderDate = (date, format) => moment(date).format(format)
