export function formatTakeResults(data, printInterval = 5) {
  if (data.length === 0) return data
  let interval = 8 * printInterval;;
  let groupByNumber = Math.floor(2000 / interval)
  const reducer = (accumulator, currentValue, currentIndex) => {
    if ((currentIndex % groupByNumber === 0) && currentIndex !== 0) {
      accumulator.push([])
    }
    let currentArray = accumulator[accumulator.length - 1]
    currentArray.push(currentValue)
    return accumulator
  }
  const result = data
    .map(d => parseFloat(d.taker.price)) //get prices from each order
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
  console.log(result)
  return result;
}