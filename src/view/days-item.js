import {createElement} from "../util.js";

const createDaysItem = (date, dayNumber) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
      <span class="day__counter">${dayNumber}</span>
      <time class="day__date" datetime="${date.toDateString()}">${date.toDateString().substr(4, 6)}</time>
      </div>
      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};

export default class DaysItem {
  constructor(date, dateNumber) {
    this._date = date;
    this._dateNumber = dateNumber;
    this._element = null;
  }

  getTemplate() {
    return createDaysItem(this._date, this._dateNumber);
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
