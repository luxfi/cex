const padDollarAmount = (amount) => {
  let _amount = amount
  if (typeof _amount === 'number') _amount = _amount.toString()
  if (_amount.indexOf('.') === -1) {
    return `${_amount}.00`
  }
  const splitAmount = _amount.split('.')
  if (splitAmount.length === 1) {
    return `${splitAmount[0]}.00`
  } else if (splitAmount[1].length === 2) {
    return `${_amount}`
  } else {
    return `${splitAmount[0]}.${splitAmount[1].padEnd(2, '0').slice(0, 2)}`
  }
}

export { padDollarAmount }