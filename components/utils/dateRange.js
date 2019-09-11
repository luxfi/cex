import moment from 'moment/moment.js'
// setTimeout(function () {
//   moment.then(moment => {
//     // Do something with moment
//   })
// }, 15000)

export const timelineLabels = (desiredStartTime, interval, period) => {
  const periodsInADay = moment.duration(1, 'day').as(period);

  const timeLabels = [];
  const startTimeMoment = moment(desiredStartTime, 'HH:mm');
  for (let i = 0; i <= periodsInADay; i += interval) {
    startTimeMoment.add(i === 0 ? 0 : interval, period);
    timeLabels.push(startTimeMoment.format('HH:mm'));
  }

  return timeLabels;
};