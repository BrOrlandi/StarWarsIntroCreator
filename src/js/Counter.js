export default class Counter {
  constructor(maxValue) {
    this.maxValue = maxValue;
    this.value = 0;
  }

  increment() {
    this.value += 1;
  }

  reset() {
    this.value = 0;
  }

  isMaxValue() {
    return this.value >= this.maxValue;
  }
}
