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

let roundNext15Min = function (m) {
var intervals = Math.floor(m.minutes() / 15);
if(m.minutes() % 15 != 0)
    intervals++;
    if(intervals == 4) {
        m.add('hours', 1);
        intervals = 0;
    }
    m.minutes(intervals * 15);
    m.seconds(0);
    return m;
}

export const timelineLabels = () => {
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
  console.log(moment().format('MMMM Do YYYY, HH:mm:ss a'))
  let now = moment();
  now = roundNext15Min(now)
  // const periodsInADay = moment.duration(1, 'day').as(period);
  let intervals = 22;
  let interval = 15;
  let period = "minutes"
  const timeLabels = [];
  const startTimeMoment = moment(now, 'HH:mm');
  for (let i = 0; i <= 7; i += 1) {
    startTimeMoment.subtract(i === 0 ? 0 : interval, period);
    timeLabels.push(startTimeMoment.format('HH:mm'));
  }

  return timeLabels.reverse();
};