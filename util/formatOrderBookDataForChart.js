const MarketOrder = require("limit-order-book").MarketOrder

export function formatTakeResults(data, printInterval = 5) {
  if (!data || data.length === 0) return []
  let amountOfArrays = 105 / printInterval
  let eachArrayLength = Math.floor(data.length / (amountOfArrays))
  const reducer = (accumulator, currentValue, currentIndex) => {
    if ((currentIndex % eachArrayLength === 0) && currentIndex !== 0) {
      accumulator.push([])
    }
    let currentArray = accumulator[accumulator.length - 1]
    currentArray.push(currentValue)
    return accumulator
  }
  const result = data
    .map(d => {
      const { taker, takeSize, takeValue } = d
      const { price } = taker
      if (taker instanceof MarketOrder) {
        return parseFloat((takeValue / takeSize).toFixed(2))
      }
      return parseFloat(taker.price)
    }) //get prices from each order
    .reduce(reducer, [[]]) //group arrays by amount of x values in chart
    .map((data, group) => {
      const max = Math.max.apply(Math, data);
      const min = Math.min.apply(Math, data);
      const open = data[0];
      const close = data[data.length - 1]
      const y = (open + close) / 2;
      return {
        x: group + 1,
        y,
        yHigh: max,
        yOpen: open,
        yClose: close,
        yLow: min,
        color: close < open ? '#EF5D28' : '#12939A',
        // opacity: y > 75 ? 0.7 : 1
      }
    })
  return result;
}