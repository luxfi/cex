export default class Strings {

  s = {}

  constructor(strings) {
    this.addStrings(strings)
  }

  addStrings(strings) {
    Object.assign(this.s, strings)
  }

  get(key, ddefault) {
    return (this.s[key] || ddefault || key)
  }
}
