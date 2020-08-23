import {createElement} from "../util.js";

const createHeaderInfo = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>
  </section>`
  );
};

export default class HeaderInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderInfo();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
