export default class Store {
  constructor() {
    this._offers = [];
    this._destination = [];
  }

  static setOffers(offers) {
    this._offers = offers;
  }

  static getOffers() {
    return this._offers;
  }

  static setDestination(destination) {
    this._destination = destination;
  }

  static getDestination() {
    return this._destination;
  }
}
