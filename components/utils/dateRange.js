import moment from 'moment/moment.js'
// setTimeout(function () {
//   moment.then(moment => {
//     // Do something with moment
//   })
// }, 15000)

// export const timelineLabels = (desiredStartTime, interval, period) => {
//   const periodsInADay = moment.duration(1, 'day').as(period);

//   const timeLabels = [];
//   const startTimeMoment = moment(desiredStartTime, 'HH:mm');
//   for (let i = 0; i <= periodsInADay; i += interval) {
//     startTimeMoment.add(i === 0 ? 0 : interval, period);
//     timeLabels.push(startTimeMoment.format('HH:mm'));
//   }

//   return timeLabels;
// };

let roundLast15Min = function (m) {
  var intervals = Math.floor(m.minutes() / 15);
    m.minutes(intervals * 15);
    m.seconds(0);
    return m;
}

export const timelineLabels = () => {
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  console.log(moment().format('MMMM Do YYYY, HH:mm:ss a'))
  let now = moment()
  let roundedLast15Min = roundLast15Min(moment())
  let duration = moment.duration(now.diff(roundedLast15Min))
  let minutesDuration = duration.as('minutes')
  let fiveMinuteIntervals = Math.floor(minutesDuration / 5)
  // const periodsInADay = moment.duration(1, 'day').as(period)
  let intervals = 21
  let interval = 15
  let period = "minutes"
  const timeLabels = []
  const startTimeMoment = moment(roundedLast15Min, 'HH:mm')
  for (let i = 0; i <= 21; i += 1) {
    if ( (i + fiveMinuteIntervals) % 3 === 0) {
      startTimeMoment.subtract(i === 0 ? 0 : interval, period)
      timeLabels.push(startTimeMoment.format('HH:mm'))
    } else {
      timeLabels.push('')
    }
  }

  return timeLabels.reverse();
};